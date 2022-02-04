import { useState } from 'react';
import { TableContainer, Table, TableBody, Paper, TableCell, TableRow, TableHead, Typography } from '@mui/material';

const PaymentDetailsTable = (): JSX.Element => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
      <Table sx={{ minWidth: 650 }} aria-label="payment-detalss">
        <TableHead>
          <TableRow>
            <TableCell align="center">QTY</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">unit price</TableCell>
            <TableCell align="center">amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">Hello</TableCell>
            <TableCell align="center">100$</TableCell>
            <TableCell align="center">1000 </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center" colSpan={2} />
            <TableCell align="center">
              <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 14, mb: 1, textTransform: 'capitalize' }}>
                Subtotal
              </Typography>
            </TableCell>
            <TableCell align="center">100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2} />
            <TableCell align="center">
              <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 14, mb: 1, textTransform: 'capitalize' }}>
                Sales Tax 6.25%
              </Typography>
            </TableCell>
            <TableCell align="center">100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2} />
            <TableCell align="center">
              <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 16, mb: 1, textTransform: 'uppercase' }}>
                total
              </Typography>
            </TableCell>
            <TableCell align="center">100</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentDetailsTable;
