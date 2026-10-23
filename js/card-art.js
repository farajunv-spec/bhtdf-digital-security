window.BHDSFCardArt = (() => {
  const ns = 'http://www.w3.org/2000/svg';
  const colors = [
    { base: '#183b3b', glow: '#315b4c', accent: '#91e2bd', warm: '#f3d27c' },
    { base: '#24383c', glow: '#40524b', accent: '#ff9879', warm: '#f3d27c' },
    { base: '#1e3a43', glow: '#31545a', accent: '#84d3df', warm: '#91e2bd' },
    { base: '#293a37', glow: '#465448', accent: '#f3d27c', warm: '#ff9879' }
  ];

  function svgElement(name, attributes = {}) {
    const node = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function render(container, station, advanced = false) {
    const domain = Math.floor((station - 1) / 10);
    const variant = (station - 1) % 3;
    const palette = colors[domain];
    const svg = svgElement('svg', { viewBox: '0 0 720 180', preserveAspectRatio: 'xMidYMid slice', focusable: 'false', 'aria-hidden': 'true' });
    svg.append(svgElement('rect', { width: '720', height: '180', rx: '8', fill: palette.base }));
    svg.append(svgElement('circle', { cx: String(95 + variant * 12), cy: '46', r: '72', fill: palette.glow, opacity: '.72' }));
    svg.append(svgElement('path', { d: 'M0 133 Q90 102 180 132 T360 132 T540 128 T720 132 V180 H0Z', fill: palette.glow, opacity: '.58' }));
    svg.append(svgElement('path', { d: 'M0 151 Q90 128 180 151 T360 151 T540 145 T720 151 M0 164 Q90 141 180 164 T360 164 T540 158 T720 164', fill: 'none', stroke: palette.accent, 'stroke-width': '2', opacity: '.4' }));

    const art = svgElement('g', { transform: `translate(${variant * 12} 0)` });
    if (domain === 0) {
      art.append(svgElement('rect', { x: '292', y: '26', width: '126', height: '126', rx: '19', fill: '#14272d', stroke: palette.accent, 'stroke-width': '3' }));
      art.append(svgElement('rect', { x: '304', y: '39', width: '102', height: '91', rx: '11', fill: '#284444' }));
      art.append(svgElement('path', { d: 'M330 81 V72 A14 14 0 0 1 358 72 V81', fill: 'none', stroke: palette.warm, 'stroke-width': '5', 'stroke-linecap': 'round' }));
      art.append(svgElement('rect', { x: '325', y: '79', width: '38', height: '30', rx: '8', fill: palette.warm }));
      art.append(svgElement('circle', { cx: '344', cy: '91', r: '4', fill: '#25372e' }));
      art.append(svgElement('path', { d: 'M344 94 V100', stroke: '#25372e', 'stroke-width': '3', 'stroke-linecap': 'round' }));
      art.append(svgElement('path', { d: 'M450 64 l13 -13 13 13 M463 51 V96', fill: 'none', stroke: palette.accent, 'stroke-width': '4', 'stroke-linecap': 'round' }));
    } else if (domain === 1) {
      art.append(svgElement('rect', { x: '262', y: '42', width: '174', height: '108', rx: '12', fill: '#14272d', stroke: palette.accent, 'stroke-width': '3' }));
      art.append(svgElement('path', { d: 'M267 49 L349 105 L431 49 M279 137 L330 94 M419 137 L367 94', fill: 'none', stroke: palette.accent, 'stroke-width': '4', 'stroke-linejoin': 'round' }));
      art.append(svgElement('path', { d: 'M466 46 l31 54 h-62 Z', fill: palette.warm }));
      art.append(svgElement('path', { d: 'M466 64 V79 M466 88 V90', stroke: '#29362d', 'stroke-width': '5', 'stroke-linecap': 'round' }));
      art.append(svgElement('path', { d: 'M230 88 C204 67 184 99 204 113 L220 126 M225 76 L244 57 M237 87 L255 68', fill: 'none', stroke: palette.warm, 'stroke-width': '5', 'stroke-linecap': 'round' }));
    } else if (domain === 2) {
      art.append(svgElement('rect', { x: '265', y: '81', width: '183', height: '67', rx: '14', fill: '#14272d', stroke: palette.accent, 'stroke-width': '3' }));
      art.append(svgElement('circle', { cx: '306', cy: '114', r: '6', fill: palette.accent }));
      art.append(svgElement('circle', { cx: '331', cy: '114', r: '6', fill: palette.warm }));
      art.append(svgElement('circle', { cx: '356', cy: '114', r: '6', fill: palette.accent, opacity: '.65' }));
      art.append(svgElement('path', { d: 'M321 67 Q356 34 391 67 M332 78 Q356 57 380 78 M346 88 Q356 78 366 88', fill: 'none', stroke: palette.warm, 'stroke-width': '5', 'stroke-linecap': 'round' }));
      art.append(svgElement('rect', { x: '470', y: '48', width: '62', height: '101', rx: '12', fill: '#14272d', stroke: palette.accent, 'stroke-width': '3' }));
    } else {
      art.append(svgElement('path', { d: 'M258 43 Q258 32 273 32 H413 Q429 32 429 48 V105 Q429 120 413 120 H331 L300 144 V120 H273 Q258 120 258 105Z', fill: '#14272d', stroke: palette.accent, 'stroke-width': '3', 'stroke-linejoin': 'round' }));
      art.append(svgElement('circle', { cx: '304', cy: '77', r: '7', fill: palette.warm }));
      art.append(svgElement('circle', { cx: '344', cy: '77', r: '7', fill: palette.warm }));
      art.append(svgElement('circle', { cx: '384', cy: '77', r: '7', fill: palette.warm }));
      art.append(svgElement('circle', { cx: '484', cy: '69', r: '22', fill: palette.warm }));
      art.append(svgElement('path', { d: 'M446 137 Q449 101 484 101 Q519 101 522 137Z', fill: palette.accent }));
    }
    svg.append(art);

    const label = svgElement('text', { x: '38', y: '105', fill: palette.accent, 'font-family': 'sans-serif', 'font-size': '30', 'font-weight': '700', opacity: '.9' });
    const stationLabel = String(station).padStart(2, '0');
    label.textContent = document.documentElement.lang === 'ar'
      ? stationLabel.replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)])
      : stationLabel;
    svg.append(label);
    if (advanced) {
      svg.append(svgElement('path', { d: 'M613 37 l9 19 21 3 -15 14 4 21 -19 -10 -19 10 4 -21 -15 -14 21 -3Z', fill: palette.warm }));
    } else {
      svg.append(svgElement('circle', { cx: '623', cy: '65', r: '20', fill: 'none', stroke: palette.warm, 'stroke-width': '3' }));
      svg.append(svgElement('circle', { cx: '623', cy: '65', r: '6', fill: palette.warm }));
    }
    container.replaceChildren(svg);
  }

  return Object.freeze({ render });
})();
