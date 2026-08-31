// backend/src/notificationService.js
// Notification Service for Agro-Vission
// Manages notifications for diagnoses, recommendations, agronomist AI responses, and usage milestones

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create a notification for a farmer
 */
async function createNotification({
  userId,
  type = 'general',
  title,
  message,
  relatedDataId = null,
  relatedType = null,
  priority = 'normal'
}) {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        relatedDataId,
        relatedType,
        priority,
        isRead: false
      }
    });
    return notification;
  } catch (err) {
    console.error('Error creating notification:', err.message);
    return null;
  }
}

/**
 * Notify when diagnosis is ready
 */
async function notifyDiagnosisReady(userId, diagnosisId, diseaseName, crop, language = 'English') {
  const isFrench = language === 'Français' || language === 'French';
  
  const title = isFrench 
    ? `Diagnostic Prêt: ${diseaseName}`
    : `Diagnosis Ready: ${diseaseName}`;
    
  const message = isFrench
    ? `Votre diagnostic pour le ${crop} a été complété avec succès. Les résultats et traitements recommandés sont maintenant disponibles dans votre historique de diagnostic.`
    : `Your diagnosis for ${crop} has been completed successfully. Results and recommended treatments are now available in your diagnosis history.`;

  return createNotification({
    userId,
    type: 'diagnosis_ready',
    title,
    message,
    relatedDataId: diagnosisId,
    relatedType: 'diagnosis',
    priority: 'normal'
  });
}

/**
 * Notify when crop recommendation is ready
 */
async function notifyRecommendationReady(userId, recommendationId, primaryCrop, location, language = 'English') {
  const isFrench = language === 'Français' || language === 'French';
  
  const title = isFrench
    ? `Recommandation Disponible: ${primaryCrop}`
    : `Recommendation Available: ${primaryCrop}`;
    
  const message = isFrench
    ? `Vos recommandations de culture pour ${location} ont été générées avec succès. Consultez les détails de fertilisation et le calendrier d'action optimal pour maximiser votre rendement.`
    : `Your crop recommendations for ${location} have been generated successfully. Check the fertilizer details and optimal action schedule to maximize your yield.`;

  return createNotification({
    userId,
    type: 'recommendation_ready',
    title,
    message,
    relatedDataId: recommendationId,
    relatedType: 'recommendation',
    priority: 'normal'
  });
}

/**
 * Notify when agronomist AI response is ready
 */
async function notifyAgronomistReady(userId, chatMessageId, language = 'English') {
  const isFrench = language === 'Français' || language === 'French';
  
  const title = isFrench
    ? 'Réponse de l\'Agronome IA Prête'
    : 'AI Agronomist Response Ready';
    
  const message = isFrench
    ? 'L\'Agronome IA a répondu à votre question. Consultez la discussion pour les conseils détaillés sur la gestion de votre ferme.`
    : 'The AI Agronomist has answered your question. Check the chat for detailed advice on managing your farm.';

  return createNotification({
    userId,
    type: 'agronomist_ready',
    title,
    message,
    relatedDataId: chatMessageId,
    relatedType: 'chat_message',
    priority: 'high'
  });
}

/**
 * Notify user after 2 uses of the app (usage milestone)
 */
async function notifyUsageMilestone(userId, usageCount, language = 'English') {
  const isFrench = language === 'Français' || language === 'French';
  
  if (usageCount === 2) {
    const title = isFrench
      ? 'Bienvenue à Bord Agriculteur!'
      : 'Welcome Aboard Farmer!';
      
    const message = isFrench
      ? 'Vous avez utilisé PACNOVA Agro-Vission 2 fois! 🎉 Notre Agronome IA basé sur Ollama s\'améliore avec chaque interaction. Plus vous posez de questions, mieux il comprendra les défis spécifiques des cultures camerounaises. Continuez à utiliser l\'application pour des recommandations personnalisées!'
      : 'You\'ve used PACNOVA Agro-Vission 2 times! 🎉 Our Ollama-based AI Agronomist improves with each interaction. The more questions you ask, the better it understands the specific challenges of Cameroon crops. Keep using the app for personalized recommendations!';

    return createNotification({
      userId,
      type: 'usage_milestone',
      title,
      message,
      priority: 'high'
    });
  }
  
  return null;
}

/**
 * Track app usage and trigger notifications
 */
async function trackAppUsage(userId, language = 'English') {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) return null;

    const newUsageCount = (user.appUsageCount || 0) + 1;
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        appUsageCount: newUsageCount,
        lastUsedAt: new Date()
      }
    });

    // Check for milestones and notify
    if (newUsageCount === 2) {
      await notifyUsageMilestone(userId, newUsageCount, language);
    }

    return updatedUser;
  } catch (err) {
    console.error('Error tracking app usage:', err.message);
    return null;
  }
}

/**
 * Get all notifications for a user
 */
async function getUserNotifications(userId, unreadOnly = false) {
  try {
    const where = { userId };
    if (unreadOnly) {
      where.isRead = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    return notifications;
  } catch (err) {
    console.error('Error fetching notifications:', err.message);
    return [];
  }
}

/**
 * Mark notification as read
 */
async function markNotificationAsRead(notificationId) {
  try {
    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        readAt: new Date()
      }
    });
    return notification;
  } catch (err) {
    console.error('Error marking notification as read:', err.message);
    return null;
  }
}

/**
 * Mark all notifications as read for a user
 */
async function markAllNotificationsAsRead(userId) {
  try {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: {
        isRead: true,
        readAt: new Date()
      }
    });
    return true;
  } catch (err) {
    console.error('Error marking all notifications as read:', err.message);
    return false;
  }
}

/**
 * Get notification count
 */
async function getUnreadNotificationCount(userId) {
  try {
    const count = await prisma.notification.count({
      where: {
        userId,
        isRead: false
      }
    });
    return count;
  } catch (err) {
    console.error('Error getting notification count:', err.message);
    return 0;
  }
}

module.exports = {
  createNotification,
  notifyDiagnosisReady,
  notifyRecommendationReady,
  notifyAgronomistReady,
  notifyUsageMilestone,
  trackAppUsage,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount
};
