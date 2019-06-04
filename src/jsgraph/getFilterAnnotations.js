export function getFilterAnnotations(filter = {}) {
  let { exclusions = [] } = filter;
  let annotations = [];
  exclusions = exclusions.filter((exclusion) => !exclusion.ignore);
  annotations = exclusions.map((exclusion) => {
    var annotation = {
      type: 'rect',
      position: [{ x: exclusion.from, y: -200 }, { x: exclusion.to, y: 200 }],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)'
    };
    return annotation;
  });
  if (filter.from !== undefined) {
    annotations.push({
      type: 'rect',
      position: [{ x: 0, y: -200 }, { x: filter.from, y: 200 }],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)'
    });
  }
  if (filter.to !== undefined) {
    annotations.push({
      type: 'rect',
      position: [{ x: filter.to, y: -200 }, { x: 10000, y: 200 }],
      strokeWidth: 0,
      fillColor: 'rgba(255,255,224,1)'
    });
  }
  return annotations;
}
