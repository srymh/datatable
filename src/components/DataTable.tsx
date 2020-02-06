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

type DataTableState = {
  cellHeights: number[];
};

class DataTable extends React.Component<DataTableProps, DataTableState> {
  private tableRef = React.createRef<HTMLTableElement>();

  constructor(props: DataTableProps) {
    super(props);

    this.state = {
      cellHeights: [],
    };

    this.handleCellHeightResize = this.handleCellHeightResize.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    this.handleCellHeightResize();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  private renderHeadingRow = (_cell: React.ReactNode, cellIndex: number) => {
    const { headings } = this.props;
    const { cellHeights } = this.state;
    const height = cellHeights.length > 0 ? cellHeights[0] : undefined;

    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headings[cellIndex]}
        header={true}
        fixed={cellIndex === 0}
        height={height}
      />
    );
  };

  private renderRow = (_row: TableData[], rowIndex: number) => {
    const { rows } = this.props;
    const { cellHeights } = this.state;
    const heightIndex = rowIndex + 1;
    const height = (heightIndex: number) =>
      heightIndex < cellHeights.length ? cellHeights[heightIndex] : undefined;

    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
              fixed={cellIndex === 0}
              height={height(heightIndex)}
            />
          );
        })}
      </tr>
    );
  };

  private getTallestCellHeights = (): number[] => {
    const table = this.tableRef.current;
    if (table !== null) {
      const rows = Array.from(table.getElementsByTagName('tr'));
      return rows.map(row => {
        const fixedCell = row.childNodes[0] as Element;
        return Math.max(row.clientHeight, fixedCell.clientHeight);
      });
    }
    return [];
  };

  private handleCellHeightResize = () => {
    this.setState({ cellHeights: this.getTallestCellHeights() });
  };

  private handleWindowResize = () => {
    // In order to reduce cell height, clear `this.state.cellHeights`.
    // If this process is skipped, the height will be only expand without reducing.
    this.setState({ cellHeights: [] });
    this.handleCellHeightResize();
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
          <table className="Table" ref={this.tableRef}>
            <thead>{theadMarkup}</thead>
            <tbody>{tbodyMarkup}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DataTable;
