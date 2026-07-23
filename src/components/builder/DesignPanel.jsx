import React from 'react'
import { Palette, Type, Box, Layers, Sparkles, Maximize } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function DesignPanel({ shop }) {
  const { updateDesignTokens } = useStore()
  const theme = shop?.theme_config || {}
  const colors = theme.colors || {}
  const typography = theme.typography || {}
  const styles = theme.styles || {}

  const handleColorChange = (key, val) => {
    updateDesignTokens(shop.id, { colors: { [key]: val } })
  }

  const handleTypographyChange = (key, val) => {
    updateDesignTokens(shop.id, { typography: { [key]: val } })
  }

  const handleStyleChange = (key, val) => {
    updateDesignTokens(shop.id, { styles: { [key]: val } })
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8 max-w-4xl">
      
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          <span>Глобальная панель дизайна (Design System Tokens)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Все изменения токенов применяются ко всей витрине в реальном времени без написания кода или правок JSON
        </p>
      </div>

      {/* SECTION 1: COLOR PALETTE */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-slate-500" />
          <span>Цветовая палитра</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Основной цвет</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 p-1.5 rounded-2xl">
              <input
                type="color"
                value={colors.primary || '#000000'}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-7 h-7 rounded-xl border-0 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{colors.primary || '#000000'}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Фон витрины</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 p-1.5 rounded-2xl">
              <input
                type="color"
                value={colors.background || '#ffffff'}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="w-7 h-7 rounded-xl border-0 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{colors.background || '#ffffff'}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Фон карточек</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 p-1.5 rounded-2xl">
              <input
                type="color"
                value={colors.cardBg || '#ffffff'}
                onChange={(e) => handleColorChange('cardBg', e.target.value)}
                className="w-7 h-7 rounded-xl border-0 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{colors.cardBg || '#ffffff'}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Цвет текста</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 p-1.5 rounded-2xl">
              <input
                type="color"
                value={colors.text || '#000000'}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className="w-7 h-7 rounded-xl border-0 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{colors.text || '#000000'}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Цвет рамок</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 p-1.5 rounded-2xl">
              <input
                type="color"
                value={colors.border || '#e2e8f0'}
                onChange={(e) => handleColorChange('border', e.target.value)}
                className="w-7 h-7 rounded-xl border-0 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{colors.border || '#e2e8f0'}</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Акцентный цвет</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 p-1.5 rounded-2xl">
              <input
                type="color"
                value={colors.accent || '#0066ff'}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-7 h-7 rounded-xl border-0 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{colors.accent || '#0066ff'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: TYPOGRAPHY & FONTS */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Type className="w-4 h-4 text-slate-500" />
          <span>Типографика и шрифты</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Шрифт магазина</label>
            <select
              value={typography.fontFamily || 'Inter'}
              onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              <option value="Inter">Inter (Современный гротеск)</option>
              <option value="Manrope">Manrope (Изысканный премиум)</option>
              <option value="Geist">Geist (Технологичный минимал)</option>
              <option value="SF Pro">SF Pro (Стиль Apple)</option>
              <option value="General Sans">General Sans (High Fashion Editorial)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Геометрический)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Регистр заголовков</label>
            <select
              value={typography.headingCase || 'uppercase'}
              onChange={(e) => handleTypographyChange('headingCase', e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              <option value="uppercase">ЗАГЛАВНЫЕ БУКВЫ (UPPERCASE)</option>
              <option value="normal">Обычный регистр (Normal)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Регистр названий брендов</label>
            <select
              value={typography.brandCase || 'uppercase'}
              onChange={(e) => handleTypographyChange('brandCase', e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              <option value="uppercase">ЗАГЛАВНЫЕ (SUPREME / BALENCIAGA)</option>
              <option value="normal">Обычный (Nike / Apple)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 3: STYLES, RADII & SHADOWS */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Box className="w-4 h-4 text-slate-500" />
          <span>Скругления, Тени и Макет</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Скругление углов (Radius)</label>
            <select
              value={styles.borderRadius || '0px'}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              <option value="0px">0px (Острые углы / Underbuy / Zara)</option>
              <option value="8px">8px (Легкое скругление / Farfetch)</option>
              <option value="16px">16px (Среднее / Modern)</option>
              <option value="24px">24px (Большое / Streetwear)</option>
              <option value="32px">32px (Максимальное / Apple Glass)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Стиль карточек товаров</label>
            <select
              value={styles.cardStyle || 'underbuy'}
              onChange={(e) => handleStyleChange('cardStyle', e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              <option value="underbuy">Underbuy (Сердечко + Заглавный текст)</option>
              <option value="poizon">Poizon Cyber Drop</option>
              <option value="zara">Zara Editorial Tall</option>
              <option value="farfetch">Farfetch Luxury</option>
              <option value="minimal">Minimal Clean</option>
              <option value="glass">Apple Glassmorphism</option>
              <option value="border">Black Boutique Border</option>
              <option value="modern">Modern Standard</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Стиль теней</label>
            <select
              value={styles.shadow || 'none'}
              onChange={(e) => handleStyleChange('shadow', e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              <option value="none">Без теней (Плоский минимализм)</option>
              <option value="soft">Мягкая тень (Soft Shadow)</option>
              <option value="heavy">Глубокая тень (Heavy)</option>
              <option value="glow">Неоновое свечение (Glow)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Ширина контейнера</label>
            <select
              value={styles.containerWidth || '1200px'}
              onChange={(e) => handleStyleChange('containerWidth', e.target.value)}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              <option value="1000px">1000px (Узкий каталог)</option>
              <option value="1200px">1200px (Стандарт)</option>
              <option value="1400px">1400px (Широкий Editorial)</option>
              <option value="100%">100% (Во всю ширину экрана)</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  )
}
