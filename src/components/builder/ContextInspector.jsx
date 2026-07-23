import React from 'react'
import {
  SlidersHorizontal,
  Palette,
  Type,
  Box,
  Image as ImageIcon,
  Check,
  X,
  Sparkles
} from 'lucide-react'
import { useStore } from '../../store/useStore'

export function ContextInspector({ shop, selectedBlock, onUpdateBlockProps }) {
  const { updateDesignTokens } = useStore()
  const theme = shop?.theme_config || {}
  const colors = theme.colors || {}
  const typography = theme.typography || {}
  const styles = theme.styles || {}

  // If a block is selected, show Block Inspector
  if (selectedBlock) {
    const props = selectedBlock.props || {}

    return (
      <aside className="w-80 bg-[#0d0f17] border-l border-slate-800/80 p-5 overflow-y-auto flex flex-col justify-between h-full select-none flex-shrink-0">
        <div className="space-y-6">
          
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-blue-500" />
              <span>Настройки: {selectedBlock.type}</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400">
              Вариант #{selectedBlock.variant || 1}
            </span>
          </div>

          {/* Variant Switcher */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">Вариант секции (1 - 15)</label>
            <select
              value={selectedBlock.variant || 1}
              onChange={(e) => onUpdateBlockProps({ ...selectedBlock, variant: parseInt(e.target.value) })}
              className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 w-full font-bold focus:ring-1 focus:ring-blue-500"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Вариант #{i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          {props.title !== undefined && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Заголовок</label>
              <input
                type="text"
                value={props.title || ''}
                onChange={(e) =>
                  onUpdateBlockProps({
                    ...selectedBlock,
                    props: { ...props, title: e.target.value }
                  })
                }
                className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 w-full font-bold focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Subtitle */}
          {props.subtitle !== undefined && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">Подзаголовок</label>
              <input
                type="text"
                value={props.subtitle || ''}
                onChange={(e) =>
                  onUpdateBlockProps({
                    ...selectedBlock,
                    props: { ...props, subtitle: e.target.value }
                  })
                }
                className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 w-full focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Image URL */}
          {props.imageUrl !== undefined && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">URL Изображения</label>
              <input
                type="url"
                value={props.imageUrl || ''}
                onChange={(e) =>
                  onUpdateBlockProps({
                    ...selectedBlock,
                    props: { ...props, imageUrl: e.target.value }
                  })
                }
                className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 w-full focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Catalog Properties */}
          {selectedBlock.type === 'products' && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Количество колонок</label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() =>
                        onUpdateBlockProps({
                          ...selectedBlock,
                          props: { ...props, columns: num }
                        })
                      }
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        (props.columns || 2) === num
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {num} Колонки
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">Стиль карточек</label>
                <select
                  value={props.cardStyle || 'underbuy'}
                  onChange={(e) =>
                    onUpdateBlockProps({
                      ...selectedBlock,
                      props: { ...props, cardStyle: e.target.value }
                    })
                  }
                  className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 w-full font-bold"
                >
                  <option value="underbuy">Underbuy (Сердечко + Заглавный бренд)</option>
                  <option value="poizon">Poizon Cyber Drop</option>
                  <option value="zara">Zara Editorial Tall</option>
                  <option value="farfetch">Farfetch Luxury</option>
                  <option value="minimal">Minimal Clean</option>
                  <option value="glass">Apple Glassmorphism</option>
                </select>
              </div>
            </div>
          )}

        </div>
      </aside>
    )
  }

  // Default: Global Design Inspector
  return (
    <aside className="w-80 bg-[#0d0f17] border-l border-slate-800/80 p-5 overflow-y-auto space-y-6 flex-shrink-0 select-none">
      <div className="border-b border-slate-800 pb-3">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider font-display flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-blue-500" />
          <span>Глобальный дизайн (Tokens)</span>
        </h2>
        <p className="text-[11px] text-slate-500 mt-1">Выберите блок на холсте для точечной настройки</p>
      </div>

      {/* Colors */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-300 uppercase">Цветовая гамма</label>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Фон страницы</span>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <input
                type="color"
                value={colors.background || '#ffffff'}
                onChange={(e) => updateDesignTokens(shop.id, { colors: { background: e.target.value } })}
                className="w-6 h-6 rounded-lg border-0 cursor-pointer"
              />
              <span className="text-[10px] font-mono text-slate-300 uppercase">{colors.background || '#ffffff'}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Фон карточек</span>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <input
                type="color"
                value={colors.cardBg || '#ffffff'}
                onChange={(e) => updateDesignTokens(shop.id, { colors: { cardBg: e.target.value } })}
                className="w-6 h-6 rounded-lg border-0 cursor-pointer"
              />
              <span className="text-[10px] font-mono text-slate-300 uppercase">{colors.cardBg || '#ffffff'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-2 pt-3 border-t border-slate-800">
        <label className="block text-xs font-bold text-slate-300 uppercase">Шрифт витрины</label>
        <select
          value={typography.fontFamily || 'Inter'}
          onChange={(e) => updateDesignTokens(shop.id, { typography: { fontFamily: e.target.value } })}
          className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 w-full font-bold"
        >
          <option value="Inter">Inter (Современный гротеск)</option>
          <option value="Manrope">Manrope (Изысканный премиум)</option>
          <option value="Geist">Geist (Технологичный)</option>
          <option value="SF Pro">SF Pro (Apple Style)</option>
          <option value="General Sans">General Sans (High Fashion)</option>
          <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
        </select>
      </div>

      {/* Radii */}
      <div className="space-y-2 pt-3 border-t border-slate-800">
        <label className="block text-xs font-bold text-slate-300 uppercase">Скругление углов</label>
        <select
          value={styles.borderRadius || '0px'}
          onChange={(e) => updateDesignTokens(shop.id, { styles: { borderRadius: e.target.value } })}
          className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 w-full font-bold"
        >
          <option value="0px">0px (Острые углы / Underbuy / Zara)</option>
          <option value="8px">8px (Легкое скругление / Farfetch)</option>
          <option value="16px">16px (Среднее / Modern)</option>
          <option value="24px">24px (Большое / Streetwear)</option>
          <option value="32px">32px (Максимальное / Apple Glass)</option>
        </select>
      </div>
    </aside>
  )
}
