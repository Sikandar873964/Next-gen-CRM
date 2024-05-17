import React from 'react'
import { CustomerTable } from './CustomerTable'

export const metadata = {
    title: 'Customers | CRM App',
    }

function page() {
  return (
    <div>
    <div className="text-4xl tracking-wider font-semibold">Customers</div>
    <p className="text-sm text-muted-foreground">
      Add, view, edit or remove Customers from the CRM
    </p>
  <CustomerTable />
  </div>
  )
}

export default page