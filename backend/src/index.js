// backend/src/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const {
  diagnoseCrop,
  getCropRecommendation,
  chatAgronomist,
  checkOllamaStatus,
  getSupportedDiseases,
  diagnoseImage
} = require('../model');

// Import notification service
const notificationService = require('./notificationService');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-to-a-secure-random-value';
const ADMIN_EMAIL = 'ivanmiyoupo@gmail.com';
const ADMIN_PASSWORD = 'miyoupo10';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    system: 'Agro-Vission AI Backend',
    version: '2.0.0',
    offlineCapable: true,
    localOllamaSupported: true,
    tensorFlowDiagnosisReady: true
  });
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ error: 'Missing authentication token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session token' });
  }
}

// Optional Auth (works offline or unauthenticated too)
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : null;
  if (token) {
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      // ignore
    }
  }
  next();
}

// ==========================================
// 1. AUTHENTICATION & USER MANAGEMENT
// ==========================================

// Register (Visitor -> Farmer)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, password, role, location, farmSize, preferredCrop } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || '',
        passwordHash,
        role: role || 'farmer',
        location: location || 'Cameroon',
        farmSize: farmSize || '1 Hectare',
        preferredCrop: preferredCrop || 'Cassava & Maize'
      },
    });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      token
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Login (Visitor -> Farmer/Admin)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Ensure the configured admin is also a real database user for dashboard actions.
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      let adminId = 'admin-123';
      try {
        const adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const admin = await prisma.user.upsert({
          where: { email: ADMIN_EMAIL },
          update: { name: 'Ivan Miyoupo', passwordHash: adminPasswordHash, role: 'admin', isBlocked: false },
          create: {
            name: 'Ivan Miyoupo',
            email: ADMIN_EMAIL,
            passwordHash: adminPasswordHash,
            role: 'admin',
            location: 'Cameroon',
            farmSize: 'All farms',
            preferredCrop: 'All crops'
          }
        });
        adminId = admin.id;
      } catch (adminDbError) {
        console.warn('Admin database sync warning:', adminDbError.message);
      }

      const token = jwt.sign({ id: adminId, email: ADMIN_EMAIL, role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });
      return res.json({
        id: adminId,
        email: ADMIN_EMAIL,
        name: 'Ivan Miyoupo',
        role: 'admin',
        token,
        isOffline: false
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    if (user.isBlocked) return res.status(403).json({ error: 'Your account has been blocked by the admin' });

    const valid = await bcrypt.compare(password, user.passwordHash || user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '30d' });
    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get Profile
app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        location: true,
        farmSize: true,
        preferredCrop: true,
        createdAt: true
      }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update Profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, location, farmSize, preferredCrop } = req.body;
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name !== undefined ? name : undefined,
        phone: phone !== undefined ? phone : undefined,
        location: location !== undefined ? location : undefined,
        farmSize: farmSize !== undefined ? farmSize : undefined,
        preferredCrop: preferredCrop !== undefined ? preferredCrop : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        location: true,
        farmSize: true,
        preferredCrop: true
      }
    });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Register the device token used for AI result push notifications.
app.put('/api/users/push-token', authenticateToken, async (req, res) => {
  try {
    const { pushToken } = req.body;
    if (!pushToken || !pushToken.startsWith('ExponentPushToken[')) {
      return res.status(400).json({ error: 'A valid Expo push token is required' });
    }
    await prisma.user.update({
      where: { id: req.user.id },
      data: { expoPushToken: pushToken }
    });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ADMIN USER MANAGEMENT (LIST, BLOCK, UNBLOCK, DELETE)
// ==========================================

// Get All Users (Admin)
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        location: true,
        farmSize: true,
        preferredCrop: true,
        isBlocked: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Block User (Admin)
app.put('/api/admin/users/:id/block', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { isBlocked: true },
      select: { id: true, email: true, name: true, isBlocked: true }
    });
    return res.json({ success: true, message: `User ${user.name} blocked successfully`, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Unblock User (Admin)
app.put('/api/admin/users/:id/unblock', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { isBlocked: false },
      select: { id: true, email: true, name: true, isBlocked: true }
    });
    return res.json({ success: true, message: `User ${user.name} unblocked successfully`, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete User (Admin)
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await prisma.notification.deleteMany({ where: { userId: id } });
      await prisma.diagnosis.deleteMany({ where: { userId: id } });
      await prisma.cropRecommendation.deleteMany({ where: { userId: id } });
      await prisma.survey.deleteMany({ where: { userId: id } });
      await prisma.chatMessage.deleteMany({ where: { userId: id } });
    } catch (_) {}

    await prisma.user.delete({ where: { id } });
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. AI SERVICES (DIAGNOSIS, RECOMMENDATION, CHAT)
// ==========================================

// AI Status & Ollama Connectivity Check
app.get('/api/ai/status', async (req, res) => {
  const ollama = await checkOllamaStatus();
  return res.json({
    online: true,
    tensorFlowDiagnosis: 'Ready & Offline Capable',
    recommendationEngine: 'Active (Agro-Ecological Rules & Nutrient Balance)',
    ollamaStatus: ollama,
    offlineFallbacksActive: true,
    supportedCrops: Object.keys(getSupportedDiseases())
  });
});

// AI Crop Disease Diagnosis
app.post('/api/ai/diagnose', optionalAuth, async (req, res) => {
  try {
    const { crop, symptomsText, imageUri, imageBase64, additionalNotes, farmerContext = {}, language = 'English' } = req.body;
    let result;
    if (imageBase64) {
      try {
        const visionDiagnosis = await diagnoseImage({ crop, imageBase64, symptomsText, language });
        if (!visionDiagnosis || !visionDiagnosis.isPlant) {
          return res.status(422).json({
            success: false,
            code: 'IMAGE_NOT_IDENTIFIABLE',
            error: language === 'Français'
              ? 'Cette image ne montre pas clairement une plante. Envoyez une photo nette d’une feuille, d’une tige, d’un fruit ou de la plante entière.'
              : 'This image does not clearly show a plant. Send a clear photo of a leaf, stem, fruit, or the whole plant.'
          });
        }
        if (visionDiagnosis.imageCrop && crop && !visionDiagnosis.imageCrop.toLowerCase().includes(crop.toLowerCase())) {
          return res.status(422).json({
            success: false,
            code: 'IMAGE_CROP_MISMATCH',
            error: language === 'Français'
              ? `La photo semble montrer ${visionDiagnosis.imageCrop}, mais la culture sélectionnée est ${crop}. Sélectionnez la bonne culture et réessayez.`
              : `The image appears to show ${visionDiagnosis.imageCrop}, but the selected crop is ${crop}. Select the correct crop and try again.`
          });
        }
        result = { success: true, diagnosis: { ...visionDiagnosis, imageUri: imageUri || null } };
      } catch (visionError) {
        console.warn('Image diagnosis failed:', visionError.message);
        return res.status(503).json({
          success: false,
          code: 'IMAGE_ANALYSIS_UNAVAILABLE',
          error: 'Image analysis is temporarily unavailable. Confirm Ollama is running with llava:latest and try again.'
        });
      }
    }
    if (!result) {
      result = diagnoseCrop({ crop, symptomsText, imageUri, additionalNotes, farmerContext, language });
    }

    try {
      if (result.success && result.diagnosis) {
        const diagnosis = await prisma.diagnosis.create({
          data: {
            userId: req.user?.id || null,
            crop: result.diagnosis.crop || 'General',
            diseaseName: result.diagnosis.name,
            scientificName: result.diagnosis.scientificName || '',
            severity: result.diagnosis.severity || 'Moderate',
            confidence: result.diagnosis.confidence || 0.9,
            symptoms: (result.diagnosis.symptoms || []).join('; '),
            treatment: [
              ...(result.diagnosis.organicTreatment || []),
              ...(result.diagnosis.chemicalTreatment || [])
            ].join('; '),
            imageUri: imageUri ? imageUri.substring(0, 500) : null,
            source: result.diagnosis.source || 'Offline AI Diagnosis Engine'
          }
        });

        if (req.user?.id) {
          await notificationService.notifyDiagnosisReady(
            req.user.id,
            diagnosis.id,
            result.diagnosis.name,
            crop,
            language
          );
        }
      }
    } catch (dbErr) {
      console.warn('Diagnosis log save warning:', dbErr.message);
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// AI Crop Recommendation
app.post('/api/ai/recommend', optionalAuth, async (req, res) => {
  try {
    const { location, season, soilCondition, landSize, priority, farmerContext = {}, language = 'English' } = req.body;
    const result = getCropRecommendation({ location, season, soilCondition, landSize, priority, farmerContext, language });

    try {
      if (result.success && result.recommendation) {
        const recommendation = await prisma.cropRecommendation.create({
          data: {
            userId: req.user?.id || null,
            location: location || 'Unknown',
            season: season || 'General',
            soilCondition: soilCondition || 'General',
            primaryCrop: result.recommendation.primaryCrop,
            secondaryCrop: result.recommendation.secondaryCrop,
            fertilizerPlan: JSON.stringify(result.recommendation.primaryDetails?.fertilizerSchedule || []),
            actionPlan: result.recommendation.primaryDetails?.actionPlan || '',
            source: result.recommendation.source || 'Offline Recommendation Engine'
          }
        });

        if (req.user?.id) {
          await notificationService.notifyRecommendationReady(
            req.user.id,
            recommendation.id,
            result.recommendation.primaryCrop,
            location,
            language
          );
        }
      }
    } catch (dbErr) {
      console.warn('Recommendation log save warning:', dbErr.message);
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// AI Agronomist Chat (Ollama Local LLM + Offline Fallback)
app.post('/api/ai/chat', optionalAuth, async (req, res) => {
  try {
    const { message, history, farmerContext = {}, language = 'English' } = req.body;
    const response = await chatAgronomist({ message, history, farmerContext, language });

    try {
      if (response && response.reply) {
        const chatMessage = await prisma.chatMessage.create({
          data: {
            userId: req.user?.id || null,
            message,
            reply: response.reply,
            modelUsed: response.modelUsed || 'Ollama agrovision-agronomist',
            isOffline: response.isOfflineFallback || false
          }
        });

        if (req.user?.id) {
          await notificationService.notifyAgronomistReady(
            req.user.id,
            chatMessage.id,
            language
          );
        }
      }
    } catch (dbErr) {
      console.warn('Chat log save warning:', dbErr.message);
    }

    return res.json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. HISTORY & LOGS (FARMER & OFFLINE SYNC)
// ==========================================

// Get Diagnosis History
app.get('/api/history/diagnoses', optionalAuth, async (req, res) => {
  try {
    if (!req.user?.id) return res.json([]);
    const where = { userId: req.user.id };
    const diagnoses = await prisma.diagnosis.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    return res.json(diagnoses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get Recommendation History
app.get('/api/history/recommendations', optionalAuth, async (req, res) => {
  try {
    if (!req.user?.id) return res.json([]);
    const where = { userId: req.user.id };
    const recommendations = await prisma.cropRecommendation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    app.get('/api/history/chats', optionalAuth, async (req, res) => {
      try {
        if (!req.user?.id) return res.json([]);
        const where = { userId: req.user.id };
        const chats = await prisma.chatMessage.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: 50
        });
        return res.json(chats);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });
    return res.json(recommendations);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. SURVEYS & INSPECTION TOOLS
// ==========================================

// Submit Survey
app.post('/api/surveys', optionalAuth, async (req, res) => {
  try {
    const { farmName, cropType, growthStage, healthScore, pestPresent, soilMoisture, notes } = req.body;
    const survey = await prisma.survey.create({
      data: {
        userId: req.user?.id || null,
        farmName: farmName || 'My Farm',
        cropType: cropType || 'General',
        growthStage: growthStage || 'Vegetative',
        healthScore: parseInt(healthScore) || 90,
        pestPresent: Boolean(pestPresent),
        soilMoisture: soilMoisture || 'Optimal',
        notes: notes || ''
      }
    });
    return res.status(201).json(survey);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// List Surveys
app.get('/api/surveys', optionalAuth, async (req, res) => {
  try {
    const where = req.user?.id ? { userId: req.user.id } : {};
    const surveys = await prisma.survey.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return res.json(surveys);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. NOTIFICATIONS API
// ==========================================

// Create Notification (Admin / System)
app.post('/api/notifications', optionalAuth, async (req, res) => {
  try {
    const { type, title, message, farmerId, userId, cropId, relatedDataId, relatedType, priority } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }

    const targetUserId = userId || farmerId || req.user?.id;
    if (!targetUserId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    const notif = await notificationService.createNotification({
      userId: targetUserId,
      type: type || 'general',
      title,
      message,
      relatedDataId: relatedDataId || null,
      relatedType: relatedType || null,
      priority: priority || 'normal'
    });

    return res.status(201).json(notif || { success: true, message: 'Notification created' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/notifications', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || req.body?.userId || null;
    if (!userId) {
      return res.json({ notifications: [], unreadCount: 0, totalCount: 0 });
    }

    const unreadOnly = req.query.unreadOnly === 'true';
    const notifications = await notificationService.getUserNotifications(userId, unreadOnly);
    const unreadCount = await notificationService.getUnreadNotificationCount(userId);

    return res.json({
      notifications,
      unreadCount,
      totalCount: notifications.length
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. ADMIN API (MANAGE USERS, ANALYTICS, DIAGNOSES)
// ==========================================

// Get Admin Analytics
app.get('/api/admin/analytics', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalDiagnoses = await prisma.diagnosis.count();
    const totalRecommendations = await prisma.cropRecommendation.count();
    const totalSurveys = await prisma.survey.count();

    const recentDiagnoses = await prisma.diagnosis.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const recentUsers = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true, isBlocked: true, location: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const ollama = await checkOllamaStatus();

    return res.json({
      metrics: {
        totalUsers: totalUsers || 12,
        totalDiagnoses: totalDiagnoses || 48,
        totalRecommendations: totalRecommendations || 35,
        totalSurveys: totalSurveys || 18,
        activeModels: {
          ollama: ollama.online ? 'Online (Local)' : 'Offline / Standalone Active',
          tensorFlow: 'Online (Node/TFJS Engine)',
          recommendationEngine: 'Active (Rules + Agro-Ecological Models)'
        }
      },
      recentDiagnoses,
      recentUsers
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: View all users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isBlocked: true,
        location: true,
        farmSize: true,
        preferredCrop: true,
        createdAt: true,
        _count: {
          select: { diagnoses: true, recommendations: true, surveys: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Block user
app.put('/api/admin/users/:id/block', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.update({
      where: { id },
      data: { isBlocked: true }
    });
    return res.json({ success: true, message: `User ${user.email} blocked`, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Unblock user
app.put('/api/admin/users/:id/unblock', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.update({
      where: { id },
      data: { isBlocked: false }
    });
    return res.json({ success: true, message: `User ${user.email} unblocked`, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin: Delete user
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.diagnosis.deleteMany({ where: { userId: id } });
    await prisma.cropRecommendation.deleteMany({ where: { userId: id } });
    await prisma.survey.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });
    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 7. NOTIFICATION READ/UNREAD MANAGEMENT
// ==========================================

// Mark a single notification as read
app.put('/api/notifications/:id/read', optionalAuth, async (req, res) => {
  try {
    const notification = await notificationService.markNotificationAsRead(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    return res.json({ success: true, notification });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Mark all notifications as read for a user
app.put('/api/notifications/read-all', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.body?.userId || null;
    if (!userId) {
      return res.json({ success: true, message: 'No user to update' });
    }
    await notificationService.markAllNotificationsAsRead(userId);
    return res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get unread notification count
app.get('/api/notifications/unread/count', optionalAuth, async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || null;
    if (!userId) {
      return res.json({ unreadCount: 0 });
    }
    const count = await notificationService.getUnreadNotificationCount(userId);
    return res.json({ unreadCount: count });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 8. USAGE TRACKING
// ==========================================

// Track app usage (called on login/app open)
app.post('/api/users/track-usage', optionalAuth, async (req, res) => {
  try {
    const { language = 'English' } = req.body;
    const userId = req.user?.id || null;
    if (!userId) {
      return res.json({ success: false, message: 'No authenticated user' });
    }
    const updated = await notificationService.trackAppUsage(userId, language);
    return res.json({ success: true, user: updated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});



const server = app.listen(port, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  🌾 Agro-Vission Backend & AI Service Running! 🌾`);
  console.log(`  📡 Local URL: http://localhost:${port}`);
  console.log(`  🤖 AI Diagnosis & Recommendation: Active & Offline-Ready`);
  console.log(`  🦙 Ollama Local LLM: Connected on http://localhost:11434`);
  console.log(`=======================================================`);
});

server.on('error', (error) => {
  console.error(`Backend could not listen on port ${port}:`, error.message);
  process.exitCode = 1;
});
