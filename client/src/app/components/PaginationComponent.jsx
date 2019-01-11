import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

class PaginationComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPageNum: Number(this.props.url.slice(this.props.url.lastIndexOf('/') + 1, this.props.url.length))
    };

    this.onChangePageNum = this.onChangePage('num');
    this.onChangePageNext = this.onChangePage('next');
    this.onChangePagePrev = this.onChangePage('prev');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.setState({ currentPageNum: Number(nextProps.url.slice(nextProps.url.lastIndexOf('/') + 1, nextProps.url.length)) });
    }
  }

  onChangePage(type) {
    return e => {
      const { url, changePage } = this.props;
      const { currentPageNum } = this.state;
      const newUrl = `${url.slice(0, url.lastIndexOf('/'))}/`;

      if (type === 'prev') {
        changePage(`${newUrl}${currentPageNum - 1}`);
        return;
      }

      if (type === 'next') {
        changePage(`${newUrl}${currentPageNum + 1}`);
        return;
      }

      const pageNum = Number(e.target.text);

      if (pageNum === currentPageNum)
        return;

      changePage(`${newUrl}${pageNum}`);
    };
  }

  render() {
    const { itemsCount, itemsPerPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const { currentPageNum } = this.state;

    return (
      <Fragment>
        {currentPageNum <= pagesCount &&
        <Fragment>
          {pagesCount > 1 &&
          <Pagination
            size="md"
            className="justify-content-center">
            <PaginationItem
              disabled={currentPageNum === 1}>
              <PaginationLink
                previous
                onClick={this.onChangePagePrev} />
            </PaginationItem>
            {currentPageNum !== 1 &&
            <PaginationItem>
              <PaginationLink onClick={this.onChangePageNum}>
                {1}
              </PaginationLink>
            </PaginationItem>
            }
            {currentPageNum > 2 &&
            <PaginationItem>
              <PaginationLink onClick={this.onChangePagePrev}>
                ...
              </PaginationLink>
            </PaginationItem>
            }
            <PaginationItem active>
              <PaginationLink>
                {currentPageNum}
              </PaginationLink>
            </PaginationItem>
            {pagesCount - currentPageNum > 1 &&
            <PaginationItem>
              <PaginationLink onClick={this.onChangePageNext}>
                ...
              </PaginationLink>
            </PaginationItem>
            }
            {currentPageNum !== pagesCount &&
            <PaginationItem>
              <PaginationLink onClick={this.onChangePageNum}>
                {pagesCount}
              </PaginationLink>
            </PaginationItem>
            }
            <PaginationItem
              disabled={currentPageNum === pagesCount}>
              <PaginationLink
                next
                onClick={this.onChangePageNext} />
            </PaginationItem>
          </Pagination>
          }
        </Fragment>
        }
      </Fragment>
    );
  }
}

PaginationComponent.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired
};

const mapDispatchActionsToProps = dispatch => {
  return {
    changePage: newUrl => dispatch(push(newUrl))
  };
};

export default connect(null, mapDispatchActionsToProps)(PaginationComponent);

// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import {
//   Pagination,
//   PaginationItem,
//   PaginationLink
// } from 'reactstrap';

// class PaginationComponent extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       currentPageNum: Number(this.props.url.slice(this.props.url.lastIndexOf('/') + 1, this.props.url.length))
//     };

//     this.onChangePageNum = this.onChangePage('num');
//     this.onChangePageNext = this.onChangePage('next');
//     this.onChangePagePrev = this.onChangePage('prev');
//   }

//   componentWillReceiveProps(nextProps) {
//     if (this.props.url !== nextProps.url) {
//       this.setState({ currentPageNum: Number(nextProps.url.slice(nextProps.url.lastIndexOf('/') + 1, nextProps.url.length)) });
//     }
//   }

//   onChangePage(type) {
//     return e => {
//       const { url, changePage } = this.props;
//       const { currentPageNum } = this.state;
//       const newUrl = `${url.slice(0, url.lastIndexOf('/'))}/`;

//       if (type === 'prev') {
//         changePage(`${newUrl}${currentPageNum - 1}`);
//         return;
//       }

//       if (type === 'next') {
//         changePage(`${newUrl}${currentPageNum + 1}`);
//         return;
//       }

//       const pageNum = Number(e.target.text);

//       if (pageNum === currentPageNum)
//         return;

//       changePage(`${newUrl}${pageNum}`);
//     };
//   }

//   render() {
//     const { itemsCount, itemsPerPage } = this.props;
//     const pagesCount = Math.ceil(itemsCount / itemsPerPage);
//     const { currentPageNum } = this.state;
//     const paginationItems = [];

//     for (let i = 1; i <= pagesCount; i++) {
//       paginationItems.push(
//         <PaginationItem
//           key={i}
//           active={i === currentPageNum}>
//           <PaginationLink onClick={this.onChangePageNum}>
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       );
//     }

//     return (
//       <Fragment>
//         {pagesCount > 1 &&
//         <Pagination
//           size="md"
//           className="justify-content-center">
//           <PaginationItem
//             disabled={currentPageNum === 1}>
//             <PaginationLink
//               previous
//               onClick={this.onChangePagePrev} />
//           </PaginationItem>
//           {paginationItems}
//           <PaginationItem
//             disabled={currentPageNum === pagesCount}>
//             <PaginationLink
//               next
//               onClick={this.onChangePageNext} />
//           </PaginationItem>
//         </Pagination>
//         }
//       </Fragment>
//     );
//   }
// }

// PaginationComponent.propTypes = {
//   itemsCount: PropTypes.number.isRequired,
//   itemsPerPage: PropTypes.number.isRequired,
//   url: PropTypes.string.isRequired,
//   changePage: PropTypes.func.isRequired
// };

// const mapDispatchActionsToProps = dispatch => {
//   return {
//     changePage: newUrl => dispatch(push(newUrl))
//   };
// };

// export default connect(null, mapDispatchActionsToProps)(PaginationComponent);
