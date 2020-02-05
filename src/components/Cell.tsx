import React from 'react';

// https://github.com/Shopify/polaris-react/blob/c7390283c982c23cc79c4f09f45757e2bcd92289/src/components/DataTable/components/Cell/Cell.tsx#L12
type CellProps = {
  content?: React.ReactNode;
  header?: boolean;
  fixed?: boolean;
};

const Cell: React.FC<CellProps> = props => {
  const fixedClass = props.fixed ? ' Cell-fixed' : '';
  const headerClass = props.header ? ' Cell-header' : '';

  const className = `Cell${fixedClass}${headerClass}`;

  const cellMarkup = props.header ? (
    <th className={className}>{props.content}</th>
  ) : (
    <td className={className}>{props.content}</td>
  );

  return cellMarkup;
};

export default Cell;
