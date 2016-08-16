import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import S_S_ from './canvases.scss';

import Modules from './Modules';

class Canvases extends Component {
  render() {
    const { canvasesData, actions, maxLeft, maxTop, islimitScope, checkedCid } = this.props;
    const modulesData = _.find(canvasesData, item => item.cid === checkedCid);
    return (
      <div className={S_S_.canvases}>
        <div className={S_S_.canvas}>
          <Modules
            actions={actions}
            cid={checkedCid}
            maxLeft={maxLeft}
            maxTop={maxTop}
            islimitScope={islimitScope}
            modulesData={modulesData.modules}
            checkedMid={modulesData.checkedMid}
          />
        </div>
      </div>
    );
  }
}

Canvases.propTypes = {
  actions: PropTypes.object,
  canvasesData: PropTypes.array,
  maxLeft: PropTypes.number,
  maxTop: PropTypes.number,
  islimitScope: PropTypes.bool,
  checkedCid: PropTypes.string,
};


export default Canvases;
