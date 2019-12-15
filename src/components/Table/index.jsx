import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import styled, { css } from 'styled-components'


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

${props => props.primary && css`
  background: palevioletred;
  color: white;
`}
`;

const TableContainer = props => {
  return(
      <table>
        { props.children }
      </table>
  )
}
const TableHeader = props => {
  return(
      <thead>
        <tr>
          { props.children }
        </tr>
      </thead>
  )
}

const TableHeaderCell = props => {
  return(
      <th onClick={props.onClickHandler} >{props.label}</th>
  )
}

const TableBody = props => {
  return(
      <tbody>
        { props.children }
      </tbody>
  )
}

const TableRow = props => {
  return(
    <tr>
      { props.children }
    </tr>
  )
}

const TableRowCell = props => {
  return(
      <td>{props.value}</td>
  )
}

const TablePagination = props => {
  return(
    <div>
      {_.times(props.maxLength/props.perPage, (page) => {
        return(
          <span key={page} onClick={ () => props.onGotoPage(page) } >{page + " | "}</span>
        )
      })}
    </div>
  )
}

class Table extends React.Component {
  
  constructor(props) {
      super(props)
      this.state = { 
        columns: [], 
        data: [], 
        sortBy: null, 
        currentPage: 0,
        maxPages: 1, 
        perPage: 0,
        paginate: false
      }
  }

  componentDidMount() {
      let {columns, data, paginate } = this.props 
      // keep track of sort direction toggling internally
      columns = columns.map((column) => {
        column.push('asc')
        return column
      })

      this.setState({ 
        columns, data, 
        perPage: (paginate || data.length),
        paginate: paginate ? true : false 
      })
  }

  sortByColumn(columnIndex, columnType) {
    let direction = this.state.columns[columnIndex][2]
    let sortBy = this.state.columns[columnIndex][0]
    let data = _.orderBy(this.state.data, (arr) => {
      return arr[columnIndex]
    }, direction)

    let columns = this.state.columns.slice(0)
    columns[columnIndex][2] = direction === 'asc' ? 'desc' : 'asc'

    this.setState({ data, columns, sortBy })
  }

  gotoPage = (page) => {
    this.setState({
      currentPage: page
    })
  }
  render() {
      return(
        <React.Fragment>
          <TableContainer>
            <TableHeader>
              {
                this.state.columns.map((column, index) => {
                  return(
                    <TableHeaderCell 
                      key={index} 
                      label={column[0]} 
                      onClickHandler={ () => { this.sortByColumn(index, column[1], column[2]) } }/>
                  )
                })
              }
            </TableHeader>
            <TableBody>
                {
                  // this can probably be done simpler
                  this.state.data.slice( (this.state.perPage* (this.state.currentPage+1) ) - this.state.perPage, this.state.perPage* (this.state.currentPage+1)).map((row, index) => {
                    return(
                      <TableRow key={index}>
                        {
                          row.map((value, index) => {
                            return(<TableRowCell key={index} value={value} />)
                          })
                        }
                      </TableRow>
                    )
                  })
                }
            </TableBody>
          </TableContainer>
            {this.state.paginate && <TablePagination maxLength={this.state.data.length} perPage={this.state.perPage} onGotoPage={ this.gotoPage }/> }
        </React.Fragment>
      )
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

export default Table