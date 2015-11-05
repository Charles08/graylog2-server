import React from 'react';

import { AlarmCallback } from 'components/alarmcallbacks';
import { Spinner } from 'components/common';

const AlarmCallbackList = React.createClass({
  propTypes: {
    alarmCallbacks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    availableAlarmCallbacks: React.PropTypes.object.isRequired,
    types: React.PropTypes.object.isRequired,
    streamId: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  },
  _humanReadableType(alarmCallback) {
    if (!this.props.availableAlarmCallbacks) {
      return <Spinner />;
    }

    const available = this.props.availableAlarmCallbacks[alarmCallback.type];

    if (available) {
      return available.name;
    }

    return 'Unknown callback type';
  },
  render() {
    const alarmCallbacks = this.props.alarmCallbacks.map((alarmCallback) => {
      return (<AlarmCallback key={'alarmCallback-' + alarmCallback.id} alarmCallback={alarmCallback} streamId={this.props.streamId}
                            types={this.props.types} deleteAlarmCallback={this.props.onDelete} updateAlarmCallback={this.props.onUpdate} />);
    });

    if (alarmCallbacks.length > 0) {
      return (
        <div className="alert-callbacks">
          {alarmCallbacks}
        </div>
      );
    }

    return (
      <div className="alert alert-info no-alarm-callbacks">
        No configured alarm callbacks.
      </div>
    );
  },
});

export default AlarmCallbackList;
