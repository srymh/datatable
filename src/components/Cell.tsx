import React from 'react';

// https://github.com/Shopify/polaris-react/blob/c7390283c982c23cc79c4f09f45757e2bcd92289/src/components/DataTable/components/Cell/Cell.tsx#L12
type CellProps = {
  content?: React.ReactNode;
  header?: boolean;
};

const Cell: React.FC<CellProps> = props => {
  const cellMarkup = props.header ? (
    <th className="Cell Cell-header">{props.content}</th>
  ) : (
    <td className="Cell">{props.content}</td>
  );

  return cellMarkup;
};

export default Cell;
