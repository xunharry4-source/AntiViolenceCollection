// @ts-ignore
const cloud = require('@cloudbase/node-sdk');

/**
 * 保存风险评估结果
 * @param {Object} event - 事件参数
 * @param {Object} event.data - 评估数据
 * @returns {Promise<Object>} 保存结果
 */
exports.main = async (event, context) => {
  const { data } = event;
  
  try {
    // 获取数据库实例
    const tcb = cloud.init({
      env: context.env
    });
    const db = tcb.database();
    
    // 添加时间戳
    const saveData = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // 保存到 assessments 集合
    const result = await db.collection('assessments').add(saveData);
    
    return {
      success: true,
      id: result.id,
      message: '评估结果保存成功'
    };
  } catch (error) {
    console.error('保存评估结果失败:', error);
    return {
      success: false,
      error: error.message,
      message: '保存评估结果失败'
    };
  }
};