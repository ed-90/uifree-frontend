import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Все статические маршруты твоего сайта
const routes = [
  '',
  '/about',
  // динамические маршруты (компоненты) добавим позже через API
];

// Базовый URL (уже HTTPS)
const baseUrl = 'https://uifree.ru';

// Функция для получения всех компонентов из API
async function fetchComponentUrls() {
  try {
    const response = await fetch('https://uifree.ru/api/components?limit=1000');
    const data = await response.json();
    
    // API возвращает { components: [...] }
    const components = data.components || [];
    console.log(`📦 Получено ${components.length} компонентов из API`);
    
    return components.map(comp => `/component/${comp.id}`);
  } catch (error) {
    console.error('Ошибка при получении компонентов:', error);
    return [];
  }
}

// Генерация XML
function generateSitemapXml(urls) {
  const today = new Date().toISOString().split('T')[0];
  
  const urlElements = urls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// Основная функция
async function generateSitemap() {
  console.log('🔄 Генерация sitemap.xml...');
  
  // Получаем динамические URL компонентов
  const componentUrls = await fetchComponentUrls();
  console.log(`📦 Найдено ${componentUrls.length} URL компонентов`);
  // Объединяем статические и динамические маршруты
  const allUrls = [...routes, ...componentUrls];
  console.log(`📦 Всего URL: ${allUrls.length}`);
  // Генерируем XML
  const sitemap = generateSitemapXml(allUrls);
  
  // Сохраняем файл в public папку
  const outputPath = resolve('public/sitemap.xml');
  writeFileSync(outputPath, sitemap, 'utf8');
  
  console.log(`✅ sitemap.xml создан с ${allUrls.length} URL`);
  console.log(`📁 Путь: ${outputPath}`);
}

generateSitemap();