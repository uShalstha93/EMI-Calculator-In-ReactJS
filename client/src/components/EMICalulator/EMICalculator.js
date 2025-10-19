import React, { useState } from 'react'
import { Container, Modal, Col, Form, Table } from 'react-bootstrap'
import './style.css'
import { Formik } from 'formik'
import * as Yup from 'yup'

const EMICalculator = () => {

    const [showModal, setShowModal] = useState(false)
    const [MonthlyEMI, setMonthlyEMI] = useState('')
    const [showPrincipal, setShowPrincipal] = useState(0)
    const [showRate, setShowRate] = useState(0)
    const [showPeriod, SetShowPeriod] = useState(0)
    const [kistaSchedule, setKistaSchedule] = useState([])
    const [showSchedule, setShowSchedule] = useState(false)

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => { setShowModal(false); setMonthlyEMI('') }

    const validateFormSchema = Yup.object().shape({
        principle: Yup.number()
            .required("Amount is Required!")
            .moreThan(0, 'Amount Shouldnot be 0 or Less Than 0'),
        rate: Yup.number()
            .required('Interest Rate is Required!')
            .moreThan(0, 'Rate Shouldnot be 0 or Less Than 0'),
        period: Yup.number()
            .required('Months is Required!')
            .moreThan(0, 'Term Shouldnot be 0 or Less Than 0'),
    })

    const calculateEMI = (data) => {

        let p = data.principle
        let r = (data.rate / 100) / 12;
        let kistaNo = data.period
        let toPower = Math.pow(1 + r, kistaNo)
        const result = p * r * (toPower / (toPower - 1))
        let intSum = 0;
        let loanpmtSum = 0;
        let emipmtSum = 0;

        setMonthlyEMI(Math.round(result))

        setShowPrincipal(data.principle)
        setShowRate(data.rate);
        SetShowPeriod(data.period);

        const emi = Math.round(result);
        const schedule = []

        const currentDate = new Date();

        for (let i = 1; i < kistaNo; i++) {
            const int = p * r;
            const principalBalance = p;
            const principleRepay = emi - int;
            p -= principleRepay;

            const paymentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toLocaleDateString();
            intSum += int
            loanpmtSum += principleRepay
            emipmtSum += emi

            schedule.push({
                kista: i,
                date: paymentDate,
                principal: Math.round(principalBalance),
                interest: Math.round(int),
                principalpmt: Math.round(principleRepay),
                emi: emi,
                remBalance: Math.round(p)
            });
        }

        const lastKista = kistaNo;
        const lastPaymentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).toLocaleDateString();
        const lastPrincipalBalance = Math.round(p);
        const lastInt = Math.round(p * r);
        const lastPrincipalpmt = lastPrincipalBalance;
        const lastEmi = lastInt + lastPrincipalBalance;
        const lastRemBalance = lastPrincipalBalance - lastPrincipalpmt;
        const totalIntSum = Math.round(intSum + lastInt);
        const totalLoanpmtSum = Math.round(loanpmtSum + lastPrincipalpmt);
        const totalpmtSum = Math.round(emipmtSum + lastEmi);

        schedule.push({
            kista: lastKista,
            date: lastPaymentDate,
            principal: lastPrincipalBalance,
            interest: lastInt,
            principalpmt: lastPrincipalpmt,
            emi: lastEmi,
            remBalance: lastRemBalance
        });

        schedule.push({
            kista: '',
            date: 'Total',
            principal: '-',
            interest: totalIntSum,
            principalpmt: totalLoanpmtSum,
            emi: totalpmtSum,
            remBalance: '-'
        })
        // console.log(Math.round(lastKista), Math.round(lastPrincipalBalance), Math.round(lastInt), Math.round(lastPrincipalpmt), Math.round(lastEmi), Math.round(lastRemBalance))

        setKistaSchedule(schedule)
        // setEMI(Math.round(result))
    }

    return (
        <>
            <div className="open-button">
                <button className="open" onClick={handleShowModal}>EMI Calculator</button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size='lg' centered>
                <Modal.Header className='gamemodalheader' closeButton>
                    <Modal.Title>
                        <h1>EMI Calculator & Kista Schedule</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='gamemodalbody'>

                    <Formik
                        initialValues={{ principle: '', rate: '', period: '' }}
                        validationSchema={validateFormSchema}
                        onSubmit={
                            (values, { resetForm }) => {
                                calculateEMI(values);
                                resetForm();
                            }
                        }
                    >
                        {({ values, errors, touched, handleChange, handleSubmit }) => (
                            <Form className='main' onSubmit={handleSubmit}>
                                <Container>
                                    <div className='Row'>
                                        <label>Loan Amount :</label>
                                        <div className='input-field'>
                                            <input type='number' name='principle'
                                                placeholder='Enter Amount'
                                                onChange={handleChange} value={values.principle}
                                                style={{ borderColor: touched.principle && errors.principle ? 'red' : null }}
                                            />
                                            {touched.principle && errors.principle ? (
                                                <Col className="error-message">{errors.principle}</Col>
                                            ) : null}
                                        </div>
                                        <label>Payment System :</label>
                                    </div>
                                    <div className='Row'>
                                        <label>Interest Rate (%) :</label>
                                        <div className='input-field'>
                                            <input type='number' name='rate'
                                                placeholder='Enter Rate'
                                                onChange={handleChange} value={values.rate}
                                                style={{ borderColor: touched.rate && errors.rate ? 'red' : null }}
                                            />
                                            {touched.rate && errors.rate ? (
                                                <Col className="error-message">{errors.rate}</Col>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='Row'>
                                        <label>Term (Months) :</label>
                                        <div className='input-field'>
                                            <input type='number' name='period'
                                                placeholder='Enter Periods'
                                                onChange={handleChange} value={values.period}
                                                style={{ borderColor: touched.period && errors.period ? 'red' : null }}
                                            />
                                            {touched.period && errors.period ? (
                                                <Col className="error-message">{errors.period}</Col>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='Row Rowbody'>
                                        <div className='calculate'>
                                            <button type='submit'>CALCULATE</button>
                                        </div>
                                        <div className='result'>
                                            <label>Monthly Payment (EMI) :</label>
                                            <span>Rs. </span>
                                            <input type='number' name='emi'
                                                disabled={true}
                                                defaultValue={MonthlyEMI}
                                            />
                                        </div>
                                    </div>
                                </Container>
                            </Form>
                        )}
                    </Formik>

                    <div className='detail'>
                        <div className='detail-label'>
                            <label>{`Principal : Rs. ${showPrincipal}`}</label>
                            <label>{`Rate : ${showRate}%`}</label>
                            <label>{`Period : ${showPeriod} Months`}</label>
                        </div>
                        <div className='schedule'>
                            <button onClick={() => setShowSchedule(true)}>SHOW SCHEDULE</button>
                        </div>
                    </div>

                    <div className='schedule-tbl shadow'>
                        <Table responsive striped bordered hover size='md' className='schedule-tbl-main'>
                            <thead>
                                <tr>
                                    <th className='tbl-head'>S.N.</th>
                                    <th className='tbl-head'>Kista Date</th>
                                    <th className='tbl-head'>Principal</th>
                                    <th className='tbl-head'>Int. Pmt</th>
                                    <th className='tbl-head'>Loan Pmt</th>
                                    <th className='tbl-head'>Total Pmt</th>
                                    <th className='tbl-head'>Remaining Loan</th>
                                </tr>
                            </thead>
                            {showSchedule && (
                                <tbody>
                                    {kistaSchedule.map((item, id) => (
                                        <tr key={id}>
                                            <td className='tbl-body'>{item.kista}</td>
                                            <td className='tbl-body'>{item.date}</td>
                                            <td className='tbl-body'>{item.principal}</td>
                                            <td className='tbl-body'>{item.interest}</td>
                                            <td className='tbl-body'>{item.principalpmt}</td>
                                            <td className='tbl-body'>{item.emi}</td>
                                            <td className='tbl-body'>{item.remBalance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EMICalculator