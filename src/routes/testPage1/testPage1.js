import React from 'react';
import { connect } from 'dva';

const test = () => {
  return (
    <div>
      ./src/routes/testPage1/test1
    </div>
  );
}

test.propTypes = {
};

export default connect()(test);
