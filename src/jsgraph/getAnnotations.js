import { ABSORBANCE, TRANSMITTANCE, PERCENT_TRANSMITTANCE } from '../constants';

export function getAnnotations(spectrum, options = {}) {
  const { fillColor = 'green', strokeColor = 'red', creationFct } = options;
  const peaks = spectrum.peaks;
  if (!peaks) return [];
  let annotations = peaks.map((peak) => {
    var annotation = {
      line: 1,
      type: 'rect',
      strokeColor: strokeColor,
      strokeWidth: 0,
      fillColor: fillColor
    };
    if (creationFct) {
      creationFct(annotation, peak);
    }
    switch (spectrum.mode) {
      case ABSORBANCE:
        annotationAbsorbance(annotation, peak, options);
        break;
      case TRANSMITTANCE:
        annotationTransmittance(annotation, peak, 1, options);
        break;
      case PERCENT_TRANSMITTANCE:
        annotationTransmittance(annotation, peak, 100, options);
        break;
      default:
    }
    return annotation;
  });

  return annotations;
}

function annotationTransmittance(annotation, peak, factor = 1, options = {}) {
  const { showKind = true, showAssignment = true } = options;
  let labels = [];
  let line = 0;

  if (showKind) {
    labels.push({
      text: peak.kind,
      size: '18px',
      anchor: 'middle',
      color: 'red',
      position: {
        x: peak.wavelength,
        y: peak.transmittance * factor,
        dy: `${23 + line * 14}px`
      }
    });
    line++;
  }

  if (showAssignment) {
    labels.push({
      text: peak.assignment,
      size: '18px',
      anchor: 'middle',
      color: 'darkred',
      position: {
        x: peak.wavelength,
        y: peak.transmittance * factor,
        dy: `${23 + line * 14}px`
      }
    });
    line++;
  }

  annotation.labels = labels;
  annotation.position = [
    {
      x: peak.wavelength,
      y: peak.transmittance * factor,
      dy: '10px',
      dx: '-1px'
    },
    {
      x: peak.wavelength,
      y: peak.transmittance * factor,
      dy: '5px',
      dx: '1px'
    }
  ];
}

function annotationAbsorbance(annotation, peak, options = {}) {
  const {
    showKind = true,
    showAssignment = true,
    assignmentAngle = -45
  } = options;
  let labels = [];
  let line = 0;

  if (showKind) {
    labels.push({
      text: peak.kind,
      size: '18px',
      anchor: 'middle',
      color: 'red',
      position: {
        x: peak.wavelength,
        y: peak.absorbance,
        dy: `${-15 - line * 14}px`
      }
    });
    line++;
  }

  if (showAssignment) {
    labels.push({
      text: peak.assignment,
      size: '18px',
      angle: assignmentAngle,
      anchor: 'left',
      color: 'darkred',
      position: {
        x: peak.wavelength,
        y: peak.absorbance,
        dy: `${-15 - line * 14}px`
      }
    });
    line++;
  }

  annotation.labels = labels;

  annotation.position = [
    {
      x: peak.wavelength,
      y: peak.absorbance,
      dy: '-10px',
      dx: '-1px'
    },
    {
      x: peak.wavelength,
      y: peak.absorbance,
      dy: '-5px',
      dx: '1px'
    }
  ];
}
