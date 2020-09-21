import { all, put, call, takeEvery } from 'redux-saga/effects'
import actions from './actions'
import {
  list, detail, create, update, destroy, cancel,
  getGroups, getGraphs, getGraphMetrics, getCounters, getHistograms, getGauges, getMetrics, getMetricData, getMetricDataRealtime, getMetricDataPolling
} from 'services/application'

export function* LIST({ payload }) {
  const { skip, limit, name, zone, dtms } = payload
  loading(true)
  const response = yield call(list, skip, limit, name, zone, dtms)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        list: response,
        total: (response || []).length
      }
    })
  }
  loading(false)
}
export function* DETAIL({ payload }) {
  const { id } = payload
  loading(true)
  const response = yield call(detail, id)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        detail: response
      }
    })
  }
  loading(false)
}
export function* CREATE({ payload }) {
  const { data } = payload
  loading(true)
  const response = yield call(create, data)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        detail: response
      }
    })
  }
  loading(false)
}
export function* CLONE({ payload }) {
  const { data } = payload
  yield put({
    type: 'application/SET_STATE',
    payload: {
      clone: data
    }
  })
}
export function* UPDATE({ payload }) {
  const { id, data } = payload
  loading(true)
  const response = yield call(update, id, data)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        detail: response
      }
    })
  }
  loading(false)
}
export function* CANCEL({ payload }) {
  const { id, data } = payload
  loading(true)
  const response = yield call(cancel, id, data)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        detail: response
      }
    })
  }
  loading(false)
}
export function* DELETE({ payload }) {
  const { id } = payload
  loading(true)
  const response = yield call(destroy, id)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        detail: response
      }
    })
  }
  loading(false)
}
export function* GROUPS({ payload }) {
  const { id } = payload
  loading(true)
  const response = yield call(getGroups, id)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        groups: response
      }
    })
  }
  loading(false)
}
export function* GRAPHS({ payload }) {
  const { id } = payload
  loading(true)
  const response = yield call(getGraphs, id)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        graphs: response
      }
    })
  }
  loading(false)
}
export function* GRAPH_METRICS({ payload }) {
  const { id } = payload
  loading(true)
  const response = yield call(getGraphMetrics, id)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        graphMetrics: response
      }
    })
  }
  loading(false)
}
export function* COUNTERS({ payload }) {
  const { id, from, end } = payload
  loading(true)
  const response = yield call(getCounters, id, from, end)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        counters: response
      }
    })
  }
  loading(false)
}
export function* HISTOGRAMS({ payload }) {
  const { id, from, end } = payload
  loading(true)
  const response = yield call(getHistograms, id, from, end)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        histograms: response
      }
    })
  }
  loading(false)
}
export function* GAUGES({ payload }) {
  const { id, from, end } = payload
  loading(true)
  const response = yield call(getGauges, id, from, end)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        gauges: response
      }
    })
  }
  loading(false)
}
export function* METRICS({ payload }) {
  const { id, from, end } = payload
  loading(true)
  const response = yield call(getMetrics, id, from, end)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        metrics: response
      }
    })
  }
  loading(false)
}
export function* METRIC_DATA({ payload }) {
  const { id, type, fromTime, toTime } = payload
  loading(true)
  const response = yield call(getMetricData, id, type, fromTime, toTime)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        metricDatas: response
      }
    })
  }
  loading(false)
}
export function* METRIC_DATA_REALTIME({ payload }) {
  const { metrics, timeRange, timestamp, isRealtime } = payload
  loading(true)

  const response = yield call(getMetricDataRealtime, metrics, timeRange, timestamp, isRealtime)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        metricDatas: response
      }
    })
  }
  loading(false)
}
export function* METRIC_DATA_POLLING({ payload }) {
  const { metrics, oldData } = payload
  loading(true)
  const response = yield call(getMetricDataPolling, metrics, oldData)
  if (response) {
    yield put({
      type: 'application/SET_STATE',
      payload: {
        metricDatas: response
      }
    })
  }
  loading(false)
}
function* loading(isLoading = false) {
  yield put({
    type: 'application/SET_STATE',
    payload: {
      loading: isLoading
    }
  })
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.LIST, LIST),
    takeEvery(actions.DETAIL, DETAIL),
    takeEvery(actions.CREATE, CREATE),
    takeEvery(actions.UPDATE, UPDATE),
    takeEvery(actions.DELETE, DELETE),

    takeEvery(actions.CLONE, CLONE),
    takeEvery(actions.CANCEL, CANCEL),
    takeEvery(actions.GROUPS, GROUPS),
    takeEvery(actions.GRAPHS, GRAPHS),
    takeEvery(actions.GRAPH_METRICS, GRAPH_METRICS),
    // takeEvery(actions.COUNTERS, COUNTERS),
    takeEvery(actions.HISTOGRAMS, HISTOGRAMS),
    takeEvery(actions.GAUGES, GAUGES),
    takeEvery(actions.METRICS, METRICS),
    takeEvery(actions.METRIC_DATA, METRIC_DATA),
    takeEvery(actions.METRIC_DATA_REALTIME, METRIC_DATA_REALTIME),
    takeEvery(actions.METRIC_DATA_POLLING, METRIC_DATA_POLLING)
  ])
}
