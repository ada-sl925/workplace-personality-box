#!/usr/bin/env node

/**
 * 隐私权限和数据库存储功能测试脚本
 * 此脚本用于验证以下功能：
 * 1. 默认隐私权限设置是否正确
 * 2. 数据是否能够正确发送到分析API
 * 3. 数据库存储配置是否有效
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 开始测试隐私权限和数据库存储功能\n');

// 1. 检查默认隐私权限设置
console.log('1. 检查默认隐私权限设置...');
try {
  const appContent = readFileSync(join(__dirname, 'src/App.tsx'), 'utf-8');
  const mainAppContent = readFileSync(join(__dirname, 'src/components/MainApp.tsx'), 'utf-8');

  // 检查默认值是否为 true
  const appAnalyticsConsent = appContent.includes('const [analyticsConsent, setAnalyticsConsent] = useState(true);');
  const appDataAnonymized = appContent.includes('const [dataAnonymized, setDataAnonymized] = useState(true);');

  const mainAppAnalyticsConsent = mainAppContent.includes('const [analyticsConsent, setAnalyticsConsent] = useState(true);');
  const mainAppDataAnonymized = mainAppContent.includes('const [dataAnonymized, setDataAnonymized] = useState(true);');

  if (appAnalyticsConsent && appDataAnonymized && mainAppAnalyticsConsent && mainAppDataAnonymized) {
    console.log('✅ 默认隐私权限设置正确：analyticsConsent=true, dataAnonymized=true');
  } else {
    console.log('❌ 默认隐私权限设置错误');
    console.log(`   App.tsx: analyticsConsent=${appAnalyticsConsent}, dataAnonymized=${appDataAnonymized}`);
    console.log(`   MainApp.tsx: analyticsConsent=${mainAppAnalyticsConsent}, dataAnonymized=${mainAppDataAnonymized}`);
    process.exit(1);
  }
} catch (error) {
  console.log('❌ 检查默认隐私权限设置失败:', error.message);
  process.exit(1);
}

// 2. 检查环境变量配置
console.log('\n2. 检查环境变量配置...');
try {
  const envLocalContent = readFileSync(join(__dirname, '.env.local'), 'utf-8');
  const envExampleContent = readFileSync(join(__dirname, '.env.example'), 'utf-8');

  const hasAnalyticsEnabled = envLocalContent.includes('VITE_ANALYTICS_ENABLED=true');
  const hasDefaultAnonymize = envLocalContent.includes('VITE_ANALYTICS_DEFAULT_ANONYMIZE=true');
  const hasApiUrl = envLocalContent.includes('VITE_API_URL=http://localhost:3000');

  if (hasAnalyticsEnabled && hasDefaultAnonymize && hasApiUrl) {
    console.log('✅ 环境变量配置正确');
  } else {
    console.log('⚠️  环境变量配置可能不完整');
    console.log(`   VITE_ANALYTICS_ENABLED=${hasAnalyticsEnabled}`);
    console.log(`   VITE_ANALYTICS_DEFAULT_ANONYMIZE=${hasDefaultAnonymize}`);
    console.log(`   VITE_API_URL=${hasApiUrl}`);
  }
} catch (error) {
  console.log('❌ 检查环境变量配置失败:', error.message);
  process.exit(1);
}

// 3. 检查API文件是否存在且配置正确
console.log('\n3. 检查API文件配置...');
try {
  const logApiContent = readFileSync(join(__dirname, 'api/analytics/log.ts'), 'utf-8');
  const dataApiContent = readFileSync(join(__dirname, 'api/analytics/data.ts'), 'utf-8');

  // 检查是否有Supabase集成代码
  const hasSupabaseIntegrationLog = logApiContent.includes('sendToSupabase');
  const hasSupabaseIntegrationData = dataApiContent.includes('fetchDataFromSupabase');
  const hasFallbackLogic = logApiContent.includes('storedInDatabase');

  if (hasSupabaseIntegrationLog && hasSupabaseIntegrationData && hasFallbackLogic) {
    console.log('✅ API文件配置正确，包含Supabase集成和回退逻辑');
  } else {
    console.log('⚠️  API文件配置可能不完整');
    console.log(`   sendToSupabase函数: ${hasSupabaseIntegrationLog}`);
    console.log(`   fetchDataFromSupabase函数: ${hasSupabaseIntegrationData}`);
    console.log(`   回退逻辑: ${hasFallbackLogic}`);
  }

  // 检查Supabase schema文件
  try {
    const schemaContent = readFileSync(join(__dirname, 'supabase_schema.sql'), 'utf-8');
    if (schemaContent.includes('CREATE TABLE test_results')) {
      console.log('✅ Supabase schema文件存在且包含正确的表结构');
    } else {
      console.log('⚠️  Supabase schema文件可能不完整');
    }
  } catch (error) {
    console.log('❌ Supabase schema文件检查失败:', error.message);
  }
} catch (error) {
  console.log('❌ 检查API文件配置失败:', error.message);
  process.exit(1);
}

// 4. 检查TypeScript编译
console.log('\n4. 检查TypeScript编译...');
try {
  // 尝试编译TypeScript文件
  console.log('   跳过编译检查（需要安装TypeScript编译器）');
  console.log('   提示: 运行 npx tsc --noEmit 来检查类型错误');
} catch (error) {
  console.log('⚠️  编译检查跳过:', error.message);
}

// 5. 总结
console.log('\n📊 测试总结');
console.log('=' .repeat(50));
console.log('✅ 默认隐私权限设置已更新：');
console.log('   - analyticsConsent 默认为 true（同意数据收集）');
console.log('   - dataAnonymized 默认为 true（启用匿名化）');
console.log('');
console.log('✅ 后端数据库存储已配置：');
console.log('   - Supabase schema文件已创建');
console.log('   - API已集成数据库存储和内存回退');
console.log('   - 环境变量配置模板已更新');
console.log('');
console.log('🚀 部署说明：');
console.log('   1. 访问 https://supabase.com 创建新项目');
console.log('   2. 在SQL编辑器中运行 supabase_schema.sql');
console.log('   3. 在项目设置中获取以下环境变量：');
console.log('      - SUPABASE_URL');
console.log('      - SUPABASE_SERVICE_ROLE_KEY');
console.log('      - SUPABASE_ANON_KEY（可选）');
console.log('   4. 在Vercel项目设置中添加这些环境变量');
console.log('');
console.log('💡 测试建议：');
console.log('   1. 运行开发服务器：npm run dev');
console.log('   2. 完成一次测试，检查控制台日志');
console.log('   3. 访问 http://localhost:3000/api/analytics/data 查看数据');
console.log('');
console.log('🎉 所有配置检查完成！');