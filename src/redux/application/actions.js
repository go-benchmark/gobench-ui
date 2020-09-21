// define some action
const actions = {
  SET_STATE: 'application/SET_STATE',
  LIST: 'application/LIST',
  DETAIL: 'application/DETAIL',
  CREATE: 'application/CREATE',
  UPDATE: 'application/UPDATE',
  DELETE: 'application/DELETE',
  // other
  CANCEL: 'application/CANCEL',
  CLONE: 'application/CLONE',
  GROUPS: 'application/GROUPS',
  GRAPHS: 'application/GRAPHS',
  GRAPH_METRICS: 'application/GRAPH_METRICS',
  COUNTER: 'application/COUNTER',
  HISTOGRAMS: 'application/HISTOGRAMS',
  GAUGES: 'application/GAUGES',
  METRICS: 'application/METRICS',
  // complex
  METRIC_INTERVAL: 'application/METRIC_INTERVAL',
  METRIC_DATA: 'application/METRIC_DATA',
  METRIC_DATA_REALTIME:  'application/METRIC_DATA_REALTIME',
  METRIC_DATA_POLLING:  'application/METRIC_DATA_POLLING',

}

export default actions
