import React from 'react'
import {
  Plus,
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Layers,
  LayoutGrid,
  ChevronRight,
  Sparkles
} from 'lucide-react'

export function StructureSidebar({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onToggleHideBlock,
  onOpenLibrary
}) {
  return (
    <aside className="w-72 bg-[#0d0f17] border-r border-slate-800/80 flex flex-col justify-between h-full select-none flex-shrink-0">
      
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-500" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Слои и Секции страницы
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">
          {blocks.length}
        </span>
      </div>

      {/* Blocks Tree List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-none">
        {blocks.map((block, index) => {
          const isSelected = selectedBlockId === block.id
          const isHidden = block.hidden

          return (
            <div
              key={block.id}
              onClick={() => onSelectBlock(block.id)}
              className={`group relative rounded-2xl p-3 border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10'
                  : isHidden
                  ? 'bg-slate-900/40 border-slate-800/40 opacity-50 text-slate-500'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              {/* Left Grip & Info */}
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                <div
                  className="cursor-grab text-slate-600 hover:text-slate-300"
                  title="Перетащить блок"
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-extrabold font-display truncate capitalize">
                    {block.type}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">
                    Вариант #{block.variant || 1} • {block.props?.title || 'Секция'}
                  </span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100">
                {/* Hide / Show */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleHideBlock(block.id)
                  }}
                  className="p-1 text-slate-500 hover:text-white rounded-md transition-colors"
                  title={isHidden ? 'Показать' : 'Скрыть'}
                >
                  {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>

                {/* Duplicate */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDuplicateBlock(index)
                  }}
                  className="p-1 text-slate-500 hover:text-white rounded-md transition-colors"
                  title="Дублировать"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteBlock(block.id)
                  }}
                  className="p-1 text-slate-500 hover:text-red-400 rounded-md transition-colors"
                  title="Удалить"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )
        })}
      </div>

      {/* Bottom Big "+ Добавить секцию" Button */}
      <div className="p-4 border-t border-slate-800/80 bg-[#0d0f17]">
        <button
          onClick={onOpenLibrary}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>+ Добавить секцию</span>
        </button>
      </div>

    </aside>
  )
}
