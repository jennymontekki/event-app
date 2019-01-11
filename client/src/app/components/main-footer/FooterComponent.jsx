import React from 'react';
import './mainFooter.css';

class FooterComponent extends React.Component {
  shouldComponentUpdate() { return false; }

  render() {
    return (
      <footer className="main-footer">
        <h5 className="main-footer__copyright">Copyright &copy; 2018 by EventsApp. All rights reserved.</h5>
      </footer>
    );
  }
}

export default FooterComponent;
