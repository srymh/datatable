import React from 'react';
import Cell from './Cell';
import './DataTable.css';

// https://github.com/Shopify/polaris-react/blob/c7390283c982c23cc79c4f09f45757e2bcd92289/src/components/DataTable/DataTable.tsx#L26
type TableData = string | number | React.ReactNode;

// https://github.com/Shopify/polaris-react/blob/c7390283c982c23cc79c4f09f45757e2bcd92289/src/components/DataTable/DataTable.tsx#L30
type DataTableProps = {
  headings: React.ReactNode[];
  rows: TableData[][];
};

class DataTable extends React.Component<DataTableProps> {
  renderHeadingRow = (_cell: React.ReactNode, cellIndex: number) => {
    const { headings } = this.props;

    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headings[cellIndex]}
        header={true}
      />
    );
  };

  renderRow = (_row: TableData[], rowIndex: number) => {
    const { rows } = this.props;

    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
            />
          );
        })}
      </tr>
    );
  };

  render() {
    const { headings, rows } = this.props;

    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    this.renderRow = this.renderRow.bind(this);

    const theadMarkup = (
      <tr key="heading">{headings.map(this.renderHeadingRow)}</tr>
    );

    const tbodyMarkup = rows.map(this.renderRow);

    return (
      <div className="DataTable">
        <div className="ScrollContainer">
          <table className="Table">
            <thead>{theadMarkup}</thead>
            <tbody>{tbodyMarkup}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DataTable;
