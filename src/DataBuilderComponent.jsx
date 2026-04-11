import { useState, useEffect, useMemo } from "react";
import { DATA_SAMPLES } from './DataSamples';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const VIDEO_THEMES = [
  "midnight", "sunrise", "ocean", "mystic", "sunset", "nebula", "forest", "volcano", "deepsea", "carbon",
  "aurora", "royal", "desert", "arctic", "candy", "emerald", "cyberpunk", "lavender", "galaxy", "tropical",
  "sapphire", "flamingo", "obsidian", "citrus", "ruby", "skyfire", "minty", "retro", "neon", "champagne",
  "bloomberg", "wallstreet", "cryptoDark", "cnbc", "fintech", "hedgefund", "tradingfloor", "economy",
  "stockAlert", "bullmarket", "bearzone", "wealth", "startup"
];

function DraggableTemplateItem({ sampleKey, templateKey, pageCount }) {
  const id = `template::${sampleKey}::${templateKey}`;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-start gap-1 px-3 py-2.5 rounded-lg cursor-grab transition-all bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-1.5 w-full">
        <span className="text-[12px] text-stone-700 font-medium truncate">{templateKey}</span>
      </div>
      <div className="flex items-center gap-1.5 w-full">
        <span className="text-[10px] text-stone-400">{pageCount}</span>
        <span className="text-[10px] text-stone-400">{sampleKey.replace("_VIDEO_COMPONENTS", "")}</span>
      </div>
    </div>
  );
}

function SortableItem({ id, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const templateKey = id.split('::')[1];

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div className="flex items-center gap-2">
        <div {...attributes} {...listeners} className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-300 rounded-lg cursor-grab hover:bg-stone-50 flex-1 shadow-sm">
          <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
          <span className="text-sm text-stone-700">{templateKey}</span>
        </div>
        <button type="button" onClick={() => onRemove(id)} className="p-1.5 text-stone-400 hover:text-red-600 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DropZone({ children, isEmpty }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'selected-drop-zone' });

  return (
    <div ref={setNodeRef} className={`flex-1 space-y-0 min-h-[200px] p-3 rounded-lg bg-stone-50 border-2 ${isOver ? 'border-stone-400 bg-stone-100' : 'border-dashed border-stone-200'} overflow-y-auto`}>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-full text-stone-400 text-sm py-8">
          <svg className="w-8 h-8 mb-2 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Drag templates here to build your video
        </div>
      ) : (
        <div className="space-y-1">{children}</div>
      )}
    </div>
  );
}

const DataBuilderComponent = ({ handleData }) => {
  const [data, setData] = useState({ title: "Sample", pages: [] });
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const [templateParams, setTemplateParams] = useState({
    theme: "midnight", isVertical: true, delay: 1, disableTts: false,
  });

  const isVertical = useMemo(() => {
    if (typeof window !== 'undefined') return window.innerHeight > window.innerWidth;
    return true;
  }, []);

  useEffect(() => {
    setTemplateParams(prev => ({ ...prev, isVertical }));
  }, [isVertical]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const groupedTemplates = Object.keys(DATA_SAMPLES).map(sampleKey => ({
    category: sampleKey.replace("_VIDEO_COMPONENTS", "").replace(/_/g, " "),
    sampleKey,
    templates: Object.keys(DATA_SAMPLES[sampleKey])
  }));

  const findKey = (id) => {
    if (id.startsWith('template::')) return id.replace('template::', '');
    return id;
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const key = findKey(active.id);
    const isFromTemplates = active.id.startsWith('template::');
    const isReordering = selectedTemplates.includes(key) && selectedTemplates.includes(over.id);

    if (over.id === 'selected-drop-zone') {
      const newSelected = [...selectedTemplates, key];
      setSelectedTemplates(newSelected);
      updatePages(newSelected);
    } else if (isReordering) {
      const oldIndex = selectedTemplates.indexOf(key);
      const newIndex = selectedTemplates.indexOf(over.id);
      if (oldIndex !== newIndex) {
        const newSelected = arrayMove(selectedTemplates, oldIndex, newIndex);
        setSelectedTemplates(newSelected);
        updatePages(newSelected);
      }
    } else if (isFromTemplates && selectedTemplates.includes(over.id)) {
      const newSelected = [...selectedTemplates, key];
      setSelectedTemplates(newSelected);
      updatePages(newSelected);
    }
  };

  const updatePages = (selected) => {
    const allTemplates = [];
    selected.forEach(key => {
      const [sampleKey, templateKey] = key.split('::');
      if (DATA_SAMPLES[sampleKey]?.[templateKey]) {
        const templatePages = DATA_SAMPLES[sampleKey][templateKey];
        const withParams = templatePages.map(page => ({
          ...page,
          theme: templateParams.theme,
          isVertical: templateParams.isVertical,
          delay: templateParams.delay,
          disableTts: templateParams.disableTts,
        }));
        allTemplates.push(...withParams);
      }
    });
    setData(prev => ({ ...prev, pages: allTemplates.length ? JSON.stringify(allTemplates, null, 4) : "" }));
  };

  const removeTemplate = (key) => {
    const newSelected = selectedTemplates.filter(k => k !== key);
    setSelectedTemplates(newSelected);
    updatePages(newSelected);
  };

  const clearTemplates = () => { setSelectedTemplates([]); setData({ ...data, pages: "" }); };

  const updateParam = (key, value) => {
    setTemplateParams(prev => ({ ...prev, [key]: value }));

    const pagesValue = data.pages;
    if (!pagesValue) return;

    let parsed;
    if (typeof pagesValue === 'string') {
      try {
        parsed = JSON.parse(pagesValue);
      } catch (e) {
        console.log('Invalid JSON in pages');
        return;
      }
    } else if (Array.isArray(pagesValue)) {
      parsed = pagesValue;
    } else {
      return;
    }

    if (!Array.isArray(parsed) || parsed.length === 0) return;

    const updated = parsed.map(page => {
      if (key === 'delay') return { ...page, delay: parseInt(value) };
      if (key === 'isVertical') return { ...page, isVertical: value };
      if (key === 'disableTts') return { ...page, disableTts: value };
      return { ...page, [key]: value };
    });

    setData(prev => ({ ...prev, pages: JSON.stringify(updated, null, 4) }));
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-stone-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] flex flex-col">
          <div className="mb-4 lg:mb-6">
            <h1 className="text-2xl lg:text-3xl font-light text-stone-800 mb-1">Build Your Video Data</h1>
            <p className="text-stone-500 text-xs lg:text-sm">Drag templates from left to right to build your video</p>
          </div>

          <div className={`flex-1 flex ${isVertical ? 'flex-col' : 'flex-row'} gap-3 lg:gap-5 overflow-hidden`}>
            <div className={`${isVertical ? 'w-full' : 'w-[45%]'} flex flex-col gap-3 lg:gap-5 overflow-y-auto`}>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-stone-100">
                <label htmlFor="video_title" className="block text-sm font-medium text-stone-700 mb-2">Video Title</label>
                <input id="video_title" type="text" value={data?.title} onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 text-sm" placeholder="Enter video title..." />
              </div>

              {selectedTemplates.length > 0 && (
                <div className="bg-white rounded-lg p-4 shadow-sm border border-stone-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-stone-700">Template Params ({selectedTemplates.length})</span>
                    <button type="button" onClick={clearTemplates} className="text-xs text-red-600 hover:text-red-800">Clear all</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select value={templateParams.theme} onChange={(e) => updateParam('theme', e.target.value)} className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700">
                      {VIDEO_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select value={String(templateParams.isVertical)} onChange={(e) => updateParam('isVertical', e.target.value === 'true')} className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700">
                      <option value="true">Vertical</option><option value="false">Horizontal</option>
                    </select>
                    <select value={templateParams.delay} onChange={(e) => updateParam('delay', parseInt(e.target.value))} className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700">
                      {[1, 2, 3, 4, 5].map(d => <option key={d} value={d}>{d}s</option>)}
                    </select>
                    <select value={String(templateParams.disableTts)} onChange={(e) => updateParam('disableTts', e.target.value === 'true')} className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700">
                      <option value="false">TTS On</option><option value="true">TTS Off</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg p-4 shadow-sm border border-stone-100 flex-1">
                <h2 className="text-base font-medium text-stone-800 mb-2">Available Templates</h2>
                <p className="text-stone-500 text-xs mb-3">Drag to add (add same multiple times)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 max-h-[600px] overflow-y-auto pr-1">
                  {groupedTemplates.flatMap(group =>
                    group.templates.map(templateKey => (
                      <DraggableTemplateItem
                        key={`${group.sampleKey}::${templateKey}`}
                        sampleKey={group.sampleKey}
                        templateKey={templateKey}
                        pageCount={DATA_SAMPLES[group.sampleKey][templateKey].length}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className={`${isVertical ? 'w-full' : 'w-[55%]'} flex flex-col gap-3 lg:gap-5 overflow-hidden`}>
              <div className=" max-h-[300px] bg-white rounded-lg p-4 shadow-sm border border-stone-100 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-medium text-stone-800">Video Sequence</h2>
                  <span className="text-xs text-stone-500">{selectedTemplates.length} pages</span>
                </div>
                <SortableContext items={selectedTemplates} strategy={verticalListSortingStrategy}>
                  <DropZone isEmpty={selectedTemplates.length === 0}>
                    {selectedTemplates.map((key, index) => (
                      <div key={key}>
                        <SortableItem id={key} onRemove={removeTemplate} />
                        {index < selectedTemplates.length - 1 && (
                          <div className="flex justify-center py-0.5"><svg className="w-4 h-4 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></div>
                        )}
                      </div>
                    ))}
                  </DropZone>
                </SortableContext>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-stone-100 flex-1 min-h-0 flex flex-col">
                <label htmlFor="video_pages" className="block text-sm font-medium text-stone-700 mb-2">Video Pages (JSON)</label>
                <textarea id="video_pages" value={data.pages} onChange={(e) => setData({ ...data, pages: e.target.value })}
                  className="flex-1 w-full px-3 py-2 rounded-lg border border-stone-200 text-stone-700 font-mono text-xs bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 resize-none" placeholder="{}" />
              </div>
            </div>
          </div>

          <button disabled={!data?.title || !data.pages} id="submit" onClick={() => handleData({ ...data, pages: JSON.parse(data.pages) })}
            className="w-full py-3 px-4 bg-stone-800 text-white font-medium rounded-lg hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed">
            Generate Video Data
          </button>
        </div>
      </div>

      <DragOverlay>
        {activeId && (
          <div className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-stone-800 rounded-lg shadow-lg cursor-grabbing">
            <svg className="w-4 h-4 text-stone-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
            <span className="text-sm font-medium">{findKey(activeId).split('::')[1]}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default DataBuilderComponent;