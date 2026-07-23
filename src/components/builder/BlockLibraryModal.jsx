import React, { useState } from 'react'
import { X, Plus, Layers, Sparkles } from 'lucide-react'
import { TILDA_BLOCK_LIBRARY } from '../../store/useStore'

export function BlockLibraryModal({ isOpen, onClose, onSelectBlock }) {
  const [activeCategory, setActiveCategory] = useState(TILDA_BLOCK_LIBRARY[0].category)

  if (!isOpen) return null

  const currentGroup = TILDA_BLOCK_LIBRARY.find((g) => g.category === activeCategory) || TILDA_BLOCK_LIBRARY[0]

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-[2.5rem] max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Библиотека Готовых Блоков (Tilda Style)</span>
            </h3>
            <p className="text-xs text-slate-500">Выберите готовый вариант секции из коллекции</p>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-black rounded-full bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs Header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
          {TILDA_BLOCK_LIBRARY.map((group) => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === group.category
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-black'
              }`}
            >
              {group.name} ({group.count})
            </button>
          ))}
        </div>

        {/* Variants Cards Grid */}
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
          {currentGroup.items.map((item) => (
            <div
              key={item.variant}
              onClick={() => {
                onSelectBlock(item)
                onClose()
              }}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-black p-5 rounded-3xl cursor-pointer transition-all flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-slate-800 text-[10px] font-bold border border-slate-200">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>Вариант #{item.variant}</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-black transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-black">
                <span>Добавить блок</span>
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
