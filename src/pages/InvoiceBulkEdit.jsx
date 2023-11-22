import React, { useState } from "react";
import { Button, Card, Col, InputGroup, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateInvoice } from "../redux/invoicesSlice";
// ........................................................................
import { useInvoiceListData } from "../redux/hooks";
import Form from "react-bootstrap/Form";

// ........................................................................
const InvoiceBulkEdit = () => {
    const { invoiceList, getOneInvoice } = useInvoiceListData();
    const isListEmpty = invoiceList.length === 0;
    const navigate = useNavigate();

    return (<>

        <Row>
            <Col className="mx-auto" xs={12} md={8} lg={9}>
                <h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>
                <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
                    {isListEmpty ? (
                        <div className="d-flex flex-column align-items-center">
                            <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
                            <Link to="/create">
                                <Button variant="primary">Create Invoice</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <h3 className="fw-bold pb-2 pb-md-4">Bulk Editing Invoices</h3>
                                <Link to="/">
                                    <Button variant="primary mb-2 mb-md-4">Invoice List</Button>
                                </Link>

                            </div>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Invoice No.</th>
                                        <th>Bill To</th>
                                        <th>Bill To Email</th>
                                        {/* ........................................................................... */}
                                        <th>Bill from</th>
                                        <th>Bill from Email</th>
                                        {/* ............................................................................................. */}
                                        <th>Due Date</th>
                                        <th>Currency</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceList.map((invoice) => (
                                        <InvoiceRow
                                            key={invoice.id}
                                            invoice={invoice}
                                            navigate={navigate}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card>
            </Col>
        </Row>
    </>
    );
};

const InvoiceRow = ({ invoice, navigate }) => {
    // ..............................................................................................
    const { getOneInvoice } = useInvoiceListData();
    // ..............................................................................................
    const [isOpen, setIsOpen] = useState(false);
    // ..............................................................................................
    const [nameTo, setNameTo] = useState(getOneInvoice(invoice.id).billTo);
    const [nameFrom, setNameFrom] = useState(getOneInvoice(invoice.id).billFrom);
    const [billToEmail, setBillToEmail] = useState(getOneInvoice(invoice.id).billToEmail);
    const [billFromEmail, setBillFromEmail] = useState(getOneInvoice(invoice.id).billFromEmail);
    const [date, setDate] = useState(getOneInvoice(invoice.id).dateOfIssue);
    const [currency, setCurrency] = useState(getOneInvoice(invoice.id).currency);
    // ..............................................................................................
    const dispatch = useDispatch();

    const openModal = (event) => {
        event.preventDefault();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    // ..............................................................................................
    const editNameTo = (value) => {
        if (value)
            setNameTo(value);
    };
    const editNameFrom = (value) => {
        if (value)
            setNameFrom(value);
    };

    const editBillToEmail = (value) => {
        if (value)
            setBillToEmail(value);
    };
    const editBillFromEmail = (value) => {
        if (value)
            setBillFromEmail(value);
    };

    const editDate = (value) => {
        setDate(value);
    };

    const editCurrency = (value) => {
        setCurrency(value);
    };


    const handleSave = (Id) => {
        console.log(getOneInvoice(Id))
        const data = { ...getOneInvoice(Id), billTo: nameTo, billFrom: nameFrom, billToEmail: billToEmail, billFromEmail: billFromEmail, dateOfIssue: date, currency: currency }
        dispatch(updateInvoice({ id: Id, updatedInvoice: data }));
        alert("Invoice updated successfuly 🥳");
    }
    // ..............................................................................................
    return (
        <tr>
            <td>{invoice.invoiceNumber}</td>
            {/* ...................................................................................................... */}
            {/* bill to */}
            <td className="fw-normal">
                <Form.Control
                    type="text"
                    placeholder={`${getOneInvoice(invoice.id).billTo}`}
                    value={nameTo}
                    name="billTo"
                    onChange={(e) => editNameTo(e.target.value)}
                />
            </td>
            {/* bill to email */}
            <td className="fw-normal">
                <Form.Control
                    type="email"
                    placeholder={`${getOneInvoice(invoice.id).billToEmail}`}
                    value={billToEmail}
                    name="billToEmail"
                    onChange={(e) => editBillToEmail(e.target.value)}
                />
            </td>
            {/* bill from */}
            <td className="fw-normal">
                <Form.Control
                    type="text"
                    placeholder={`${getOneInvoice(invoice.id).billFrom}`}
                    value={nameFrom}
                    name="billFrom"
                    onChange={(e) => editNameFrom(e.target.value)}
                />
            </td>
            {/* bill from email*/}
            <td className="fw-normal">
                <Form.Control
                    type="email"
                    placeholder={`${getOneInvoice(invoice.id).billFromEmail}`}
                    value={billFromEmail}
                    name="billFromEmail"
                    onChange={(e) => editBillFromEmail(e.target.value)}
                />
            </td>
            {/* due date */}
            <td className="fw-normal">
                <Form.Control
                    type="date"
                    value={date}
                    name="dateOfIssue"
                    onChange={(e) => editDate(e.target.value)}
                />
            </td>
            {/* Currency */}
            <td className="fw-normal">
                <Form.Select value={currency} placeholder={`${getOneInvoice(invoice.id).currency}`} name="currency" onChange={(e) => editCurrency(e.target.value)}>
                    <option value="USD">USD (United States Dollar)</option>
                    <option value="GBP">GBP (British Pound Sterling)</option>
                    <option value="JPY">JPY (Japanese Yen)</option>
                    <option value="CAD">CAD (Canadian Dollar)</option>
                    <option value="AUD">AUD (Australian Dollar)</option>
                    <option value="SGD">SGD (Singapore Dollar)</option>
                    <option value="CNY">CNY (Chinese Renminbi)</option>
                    <option value="BTC">BTC (Bitcoin)</option>
                </Form.Select>
            </td>
            {/* ...................................................................................................... */}
            <td>
                <Button variant="success" onClick={() => handleSave(invoice.id)}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        Save
                    </div>
                </Button>
            </td>
            <InvoiceModal
                showModal={isOpen}
                closeModal={closeModal}
                info={{
                    isOpen,
                    id: invoice.id,
                    currency: invoice.currency,
                    currentDate: invoice.currentDate,
                    invoiceNumber: invoice.invoiceNumber,
                    dateOfIssue: invoice.dateOfIssue,
                    billTo: invoice.billTo,
                    billToEmail: invoice.billToEmail,
                    billToAddress: invoice.billToAddress,
                    billFrom: invoice.billFrom,
                    billFromEmail: invoice.billFromEmail,
                    billFromAddress: invoice.billFromAddress,
                    notes: invoice.notes,
                    total: invoice.total,
                    subTotal: invoice.subTotal,
                    taxRate: invoice.taxRate,
                    taxAmount: invoice.taxAmount,
                    discountRate: invoice.discountRate,
                    discountAmount: invoice.discountAmount,
                }}
                items={invoice.items}
                currency={invoice.currency}
                subTotal={invoice.subTotal}
                taxAmount={invoice.taxAmount}
                discountAmount={invoice.discountAmount}
                total={invoice.total}
            />
        </tr >
    );
};

export default InvoiceBulkEdit;