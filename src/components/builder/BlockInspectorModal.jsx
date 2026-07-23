import React, { useState, useEffect } from 'react'
import { X, Save, SlidersHorizontal, Image as ImageIcon, Type, LayoutGrid } from 'lucide-react'

export function BlockInspectorModal({ block, isOpen, onClose, onSave }) {
  const [form, setForm] = useState({})

  useEffect(() => {
    if (block) {
      setForm({ ...block, props: { ...(block.props || {}) } })
    }
  }, [block])

  if (!isOpen || !block) return null

  const handlePropChange = (key, val) => {
    setForm((prev) => ({
      ...prev,
      props: { ...(prev.props || {}), [key]: val }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-[2.5rem] max-w-md w-full p-6 space-y-6 shadow-2xl relative">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Настройка блока [{block.type}]</span>
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-black rounded-full bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          
          {/* Variant Switcher */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Вариант оформления блока</label>
            <select
              value={form.variant || 1}
              onChange={(e) => setForm({ ...form, variant: parseInt(e.target.value) })}
              className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Вариант #{i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          {form.props?.title !== undefined && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Заголовок секции</label>
              <input
                type="text"
                value={form.props.title || ''}
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
              />
            </div>
          )}

          {/* Subtitle */}
          {form.props?.subtitle !== undefined && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Подзаголовок / Описание</label>
              <input
                type="text"
                value={form.props.subtitle || ''}
                onChange={(e) => handlePropChange('subtitle', e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full"
              />
            </div>
          )}

          {/* Image URL */}
          {form.props?.imageUrl !== undefined && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">URL Фотографии / Обложки</label>
              <input
                type="url"
                value={form.props.imageUrl || ''}
                onChange={(e) => handlePropChange('imageUrl', e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full"
              />
            </div>
          )}

          {/* Catalog Columns & Cards */}
          {block.type === 'products' && (
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Количество колонок</label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handlePropChange('columns', num)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        (form.props.columns || 2) === num
                          ? 'bg-black text-white border-black'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {num} Колонки
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Стиль карточек</label>
                <select
                  value={form.props.cardStyle || 'underbuy'}
                  onChange={(e) => handlePropChange('cardStyle', e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
                >
                  <option value="underbuy">Underbuy (Сердечко + Заглавный бренд)</option>
                  <option value="poizon">Poizon Cyber Drop</option>
                  <option value="zara">Zara Editorial Tall</option>
                  <option value="farfetch">Farfetch Luxury</option>
                  <option value="minimal">Minimal Clean</option>
                  <option value="glass">Apple Glassmorphism</option>
                  <option value="modern">Modern Standard</option>
                </select>
              </div>
            </div>
          )}

          {/* Button Text */}
          {form.props?.buttonText !== undefined && (
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Текст на кнопке</label>
              <input
                type="text"
                value={form.props.buttonText || ''}
                onChange={(e) => handlePropChange('buttonText', e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs text-slate-900 rounded-2xl px-4 py-3 w-full font-bold"
              />
            </div>
          )}

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-200">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full">
              Отмена
            </button>
            <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-full shadow-md">
              Сохранить
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
