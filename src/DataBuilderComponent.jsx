import { useState, useEffect, useMemo } from "react";
import { DATA_SAMPLES } from './DataSamples';

const VIDEO_THEMES = [
  "midnight", "sunrise", "ocean", "mystic", "sunset", "nebula", "forest", "volcano", "deepsea", "carbon",
  "aurora", "royal", "desert", "arctic", "candy", "emerald", "cyberpunk", "lavender", "galaxy", "tropical",
  "sapphire", "flamingo", "obsidian", "citrus", "ruby", "skyfire", "minty", "retro", "neon", "champagne",
  "bloomberg", "wallstreet", "cryptoDark", "cnbc", "fintech", "hedgefund", "tradingfloor", "economy",
  "stockAlert", "bullmarket", "bearzone", "wealth", "startup"
];

const DataBuilderComponent = ({ handleData }) => {
  const [data, setData] = useState({
    title: "Sample",
    pages: [],
  });

  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const [templateParams, setTemplateParams] = useState({
    theme: "midnight",
    isVertical: true,
    delay: 1,
    disableTts: false,
  });

  const isVertical = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight > window.innerWidth;
    }
    return true;
  }, []);

  useEffect(() => {
    setTemplateParams(prev => ({ ...prev, isVertical: isVertical }));
  }, [isVertical]);

  const toggleTemplate = (sampleKey, templateKey) => {
    const key = `${sampleKey}::${templateKey}`;
    const newSelected = selectedTemplates.includes(key)
      ? selectedTemplates.filter(k => k !== key)
      : [...selectedTemplates, key];
    setSelectedTemplates(newSelected);
    updatePages(newSelected);
  };

  const updatePages = (selected) => {
    const allTemplates = [];
    selected.forEach(key => {
      const [sampleKey, templateKey] = key.split('::');
      if (DATA_SAMPLES[sampleKey] && DATA_SAMPLES[sampleKey][templateKey]) {
        allTemplates.push(...DATA_SAMPLES[sampleKey][templateKey]);
      }
    });
    setData(prev => ({ ...prev, pages: allTemplates.length ? JSON.stringify(allTemplates, null, 4) : "" }));
  };

  const clearTemplates = () => {
    setSelectedTemplates([]);
    setData({ ...data, pages: "" });
  };

  const updateParam = (key, value) => {
    const newParams = { ...templateParams, [key]: value };
    setTemplateParams(newParams);

    if (data.pages) {
      try {
        const parsed = JSON.parse(data.pages);
        const updated = parsed.map(page => ({
          ...page,
          [key]: key === 'delay' ? parseInt(value) : key === 'isVertical' || key === 'disableTts' ? value : value
        }));
        setData({
          ...data,
          pages: JSON.stringify(updated, null, 4),
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const groupedTemplates = Object.keys(DATA_SAMPLES).map(sampleKey => ({
    category: sampleKey.replace("_VIDEO_COMPONENTS", "").replace(/_/g, " "),
    sampleKey,
    templates: Object.keys(DATA_SAMPLES[sampleKey])
  }));

  return (
    <div className="min-h-screen bg-stone-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] flex flex-col">
        <div className="mb-4 lg:mb-6">
          <h1 className="text-2xl lg:text-3xl font-light text-stone-800 mb-1 lg:mb-2 tracking-tight">
            Build Your Video Data
          </h1>
          <p className="text-stone-500 text-xs lg:text-sm">
            Enter a title, select templates, or craft your pages manually
          </p>
        </div>

        <div className={`flex-1 flex ${isVertical ? 'flex-col' : 'flex-row'} gap-3 lg:gap-5 overflow-hidden`}>
          <div className={`${isVertical ? 'w-full' : 'w-1/2'} flex flex-col gap-3 lg:gap-5 overflow-y-auto`}>
            <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-sm border border-stone-100">
              <label 
                htmlFor="video_title" 
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Video Title
              </label>
              <input
                id="video_title"
                type="text"
                value={data?.title}
                onChange={(e) => {
                  setData({
                    ...data,
                    title: e.target.value,
                  });
                }}
                className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-lg border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                placeholder="Enter video title..."
              />
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-sm border border-stone-100">
              <div className="mb-4">
                <h2 className="text-base lg:text-lg font-medium text-stone-800">Load from Template</h2>
                <p className="text-stone-500 text-xs lg:text-sm mt-0.5">Select multiple templates from any category</p>
              </div>
              
              {selectedTemplates.length > 0 && (
                <div className="mb-4 p-3 bg-stone-50 rounded-lg border border-stone-200 sticky top-0 z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-stone-700">
                      Template Params ({selectedTemplates.length} selected)
                    </span>
                    <button
                      type="button"
                      onClick={clearTemplates}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-stone-500">Theme</label>
                      <select
                        value={templateParams.theme}
                        onChange={(e) => updateParam('theme', e.target.value)}
                        className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-800"
                      >
                        {VIDEO_THEMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-stone-500">Orientation</label>
                      <select
                        value={templateParams.isVertical}
                        onChange={(e) => updateParam('isVertical', e.target.value === 'true')}
                        className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-800"
                      >
                        <option value="true">Vertical</option>
                        <option value="false">Horizontal</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-stone-500">Delay</label>
                      <select
                        value={templateParams.delay}
                        onChange={(e) => updateParam('delay', parseInt(e.target.value))}
                        className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-800"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(d => <option key={d} value={d}>{d}s</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-stone-500">TTS</label>
                      <select
                        value={templateParams.disableTts}
                        onChange={(e) => updateParam('disableTts', e.target.value === 'true')}
                        className="px-2 py-1 rounded border border-stone-300 text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-800"
                      >
                        <option value="false">On</option>
                        <option value="true">Off</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
               
              <div className="space-y-4">
                {groupedTemplates.map(group => (
                  <div key={group.sampleKey} className="border border-stone-200 rounded-lg overflow-hidden">
                    <div className="bg-stone-100 px-3 py-2 text-xs font-medium text-stone-600 uppercase tracking-wider">
                      {group.category}
                    </div>
                    <div className="divide-y divide-stone-100">
                      {group.templates.map(templateKey => {
                        const key = `${group.sampleKey}::${templateKey}`;
                        const isSelected = selectedTemplates.includes(key);
                        const pageCount = DATA_SAMPLES[group.sampleKey][templateKey].length;
                        return (
                          <label 
                            key={templateKey} 
                            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-stone-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleTemplate(group.sampleKey, templateKey)}
                              className="w-4 h-4 text-stone-800 border-stone-300 rounded focus:ring-stone-800"
                            />
                            <span className="text-sm text-stone-700 flex-1">{templateKey}</span>
                            <span className="text-xs text-stone-400">{pageCount} pages</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {selectedTemplates.length > 0 && (
                <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {selectedTemplates.length} template(s) selected
                  </span>
                  <button
                    type="button"
                    onClick={clearTemplates}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={`${isVertical ? 'w-full' : 'w-1/2'} bg-white rounded-lg lg:rounded-xl p-4 lg:p-5 shadow-sm border border-stone-100 flex-1 min-h-0 flex flex-col`}>
            <label 
              htmlFor="video_pages" 
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Video Pages (JSON)
            </label>
            <textarea
              id="video_pages"
              value={data.pages}
              onChange={(event) => {
                try {
                  setData({
                    ...data,
                    pages: event.target.value,
                  });
                } catch (e) {
                  console.log(e);
                }
              }}
              className="flex-1 min-h-[120px] lg:min-h-[180px] w-full px-3 lg:px-4 py-2 rounded-lg border border-stone-200 text-stone-700 font-mono text-xs lg:text-sm bg-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="{}"
            />
            <p className="text-xs text-stone-400 mt-2">
              Enter page data as JSON or use a template above
            </p>
          </div>
        </div>

        <button
          disabled={!data || !data.title || !data.pages}
          id="submit"
          onClick={() => {
            const jsonData = {
              ...data,
              pages: JSON.parse(data.pages),
            };
            handleData(jsonData);
          }}
          className="w-full py-3 lg:py-4 px-4 lg:px-6 bg-stone-800 text-white font-medium rounded-lg hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-sm lg:text-base"
        >
          Generate Video Data
        </button>
      </div>
    </div>
  );
};

export default DataBuilderComponent;