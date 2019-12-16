import React from "react"
import { Link } from "gatsby"
import moment from 'moment'

import {
  Collapse,
  Icon,
  Select,
  Table,
  Progress,
  Avatar,
  Switch,
  Drawer,
  Comment,
  List,
  Input,
  Button,
  Form,
} from "antd"

import ContainerLayout from "../components/layout"

import "./main-page.css"

const { Panel } = Collapse
const { Option } = Select

function callback(key) {
  console.log(key)
}

function format_numbers(val, asPct = false) {
  if (!val) return "-"

  const isNeg = val < 0
  const scale = (asPct ? 100 : 1) * (isNeg ? -1 : 1)
  const [whole, frac] = (scale * val).toString().split(".")
  return (
    (isNeg ? "(" : "") +
    whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (frac ? ("." + frac.length < 2 ? frac : frac.substring(0, 2)) : "") +
    (asPct ? "%" : "") +
    (isNeg ? ")" : "")
  )
}

const columns = [
  {
    title: "Section",
    dataIndex: "section",
  },
  {
    title: "Progress",
    dataIndex: "progress",
  },
  {
    title: "Notes",
    dataIndex: "notes",
    render: notes =>
      notes && notes.length > 0 ? (
        <Icon type="message" onClick={() => setVisible(true)} />
      ) : (
        <span />
      ),
  },
  {
    title: "Oct 31, 2019",
    dataIndex: "curr_month",
    render: v => format_numbers(v),
  },
  {
    title: "Sep 30, 2019",
    dataIndex: "prev_month",
    render: v => format_numbers(v),
  },
  {
    title: "Change",
    key: "change",
    render: (txt, record) =>
      format_numbers(record.curr_month - record.prev_month),
  },
  {
    title: "Change %",
    key: "change_pct",
    render: (txt, record) =>
      format_numbers(
        (record.curr_month - record.prev_month) / record.prev_month,
        true
      ),
  },
]

const acc_columns = [
  {
    title: "Account No.",
    dataIndex: "acct_no",
  },
  {
    title: "Account Description",
    dataIndex: "desc",
  },
  {
    title: "Oct 31, 2019",
    dataIndex: "curr_month",
    render: val => format_numbers(val),
  },
  {
    title: "Sep 30, 2019",
    dataIndex: "prev_month",
    render: val => format_numbers(val),
  },
  {
    title: "Change",
    key: "change",
    render: (txt, record) =>
      format_numbers(record.curr_month - record.prev_month),
  },
  {
    title: "Change %",
    key: "change_pct",
    render: (txt, record) =>
      format_numbers(
        (record.curr_month - record.prev_month) / record.prev_month,
        true
      ),
  },
  {
    title: "Comments",
    dataIndex: "comments",
  },
]

const docs_columns = [
  {
    title: "Document Name",
    dataIndex: "name",
  },
  {
    title: "Document Amount",
    dataIndex: "amt",
    render: val => format_numbers(val),
  },
  {
    title: "Trial Balance",
    dataIndex: "balance",
    render: val => format_numbers(val),
  },
  {
    title: "Difference",
    key: "diff",
    render: (txt, record) => format_numbers(record.amt - record.balance),
  },
  {
    title: "Signoff",
    dataIndex: "signoff",
    render: signoff => {
      if (!signoff) return <Icon type="warning" />
      return signoff.map(name => (
        <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
          {name[0]}
        </Avatar>
      ))
    },
  },
  {
    title: "Notes",
    dataIndex: "notes",
    render: notes =>
      notes && notes.length > 0 ? (
        <Icon type="message" onClick={() => setVisible(true)} />
      ) : (
        <span />
      ),
  },
]

const checklist_columns = [
  {
    title: "Description",
    dataIndex: "desc",
  },
  {
    title: "Assigned To",
    dataIndex: "assigned",
    render: assigned => (
      <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
        {assigned[0]}
      </Avatar>
    ),
  },
  {
    title: "Due Date",
    dataIndex: "due",
  },
  {
    title: "Completed",
    dataIndex: "completed",
    render: val => <Switch defaultChecked={val} />,
  },
  {
    title: "Reviewed",
    dataIndex: "reviewed",
    render: val => <Switch defaultChecked={val} />,
  },
  {
    title: "Notes",
    dataIndex: "notes",
    render: notes =>
      notes && notes.length > 0 ? (
        <Icon type="message" onClick={() => setVisible(true)} />
      ) : (
        <span />
      ),
  },
]

let data = [
  {
    section: "Cash and Cash Equivalents",
    progress: "3/10",
    notes: [{ note: "Testing" }],
    curr_month: 80000,
    prev_month: 80000,
    checklist: [
      {
        desc: "Complete Bank reconcilition for TD Canada",
        assigned: "John",
        due: "Nov 5, 2019",
        completed: true,
        reviewed: true,
      },
      {
        desc: "Download and link updated TD bank statement",
        assigned: "John",
        due: "Nov 5, 2019",
        completed: true,
        reviewed: true,
      },
      {
        desc: "Complete Bank reconcilition for BMO",
        assigned: "John",
        due: "Nov 5, 2019",
        completed: false,
        reviewed: false,
        notes: [{ from: "K", note: "testsssss" }],
      },
      {
        desc: "Download and link updated BMO bank statement",
        assigned: "John",
        due: "Nov 5, 2019",
        completed: true,
        reviewed: true,
      },
    ],
    accounts: [
      {
        acct_no: 1000,
        desc: "Bank - CAD - TD Canada",
        curr_month: 60000,
        prev_month: 30000,
        comments: "Errrrrr",
      },
      {
        acct_no: 1010,
        desc: "Bank - CAD - BMO",
        curr_month: 20000,
        prev_month: 50000,
        comments: "I am not sure",
      },
    ],
    documents: [
      {
        name: "Bank Reconciliation - TD Canada.xlsx",
        amt: 60000,
        balance: 60000,
        signoff: ["Jason", "Mark"],
      },
      {
        name: "Bank Reconciliation - BMO.xlsx",
        amt: 50000,
        balance: 20000,
        signoff: [],
      },
      {
        name: "Bank Statement - TD Canada.pdf",
        signoff: ["Jason", "Mark"],
        notes: [{ note: "Testing" }],
      },
      {
        name: "Bank Statement - BMO.pdf",
        signoff: ["Jason", "Mark"],
      },
    ],
  },
  {
    section: "Short Term Investments",
    progress: "4/8",
    curr_month: 110000,
    prev_month: 100000,
  },
  {
    section: "Prepaid Expenses",
    progress: "3/5",
    curr_month: 30000,
    prev_month: 40000,
  },
  {
    section: "Account Recievable",
    progress: "1/14",
    notes: [{ note: "Testing" }],
    curr_month: 400000,
    prev_month: 500000,
  },
]

const expandedRowRender = record => {
  return (
    <>
      <h2 style={{ paddingBottom: 20 }}>{record.section} Summary</h2>
      <Table
        style={{ paddingBottom: 50 }}
        columns={acc_columns}
        dataSource={record.accounts}
        pagination={false}
        size="middle"
      />
      <h2 style={{ paddingBottom: 20 }}>Documents</h2>
      <Table
        style={{ paddingBottom: 50 }}
        columns={docs_columns}
        dataSource={record.documents}
        pagination={false}
        size="middle"
      />
      <h2 style={{ paddingBottom: 20 }}>Checklist</h2>
      <Progress
        percent={eval(record.progress) * 100}
        showInfo={false}
        style={{ width: "80%", paddingRight: "20px" }}
      />
      <span>{record.progress}</span>
      <Table
        style={{ paddingBottom: 50 }}
        columns={checklist_columns}
        dataSource={record.checklist}
        pagination={false}
        size="middle"
      />
    </>
  )
}

let visible, setVisible, comments, setComments, submitting, setSubmitting, value, setValue

const msgs = [
  {
    date: "2019-11-17 3:14pm",
    from: "John",
    note: "Some number should be somewhere else",
  },
  {
    date: "2019-11-17 5:20pm",
    from: "Mary",
    note: "You are right. Approved",
  },
  {
    date: "2019-11-19 10:20am",
    from: "Terry",
    note: "O wait. I think it is caused by this other thing I forgot to submit",
  },
]

const MainPage = props => {
  [visible, setVisible] = React.useState(false);
  [comments, setComments] = React.useState([...msgs]);
  [value, setValue] = React.useState('');
  [submitting, setSubmitting] = React.useState(false);

  return (
    <ContainerLayout>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        expandedRowRender={expandedRowRender}
      />
      <Drawer
        title="Notes"
        placement="right"
        closable={true}
        mask={true}
        visible={visible}
        onClose={() => setVisible(false)}
        getContainer={false}
        width={500}
        style={{ position: "absolute" }}
      >
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={item => (
            <li>
              <Comment
                author={item.from}
                avatar={
                  <Avatar
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {item.from[0]}
                  </Avatar>
                }
                content={item.note}
                datetime={item.date}
              />
            </li>
          )}
        />
        <div>
          <Form.Item>
            <Input.TextArea rows={4} onChange={e => setValue(e.target.value)} value={value} />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={submitting}
              onClick={() => {
                if (!value) return
                setSubmitting(true)
                setTimeout(() =>{
                  setComments([...comments, {from: "Shane L.", note:value, date:moment().format('YYYY-MM-DD h:mm a')}])
                  setSubmitting(false)
                  setValue('')
                }, 1000)
              }}
              type="primary"
            >
              Add Comment
            </Button>
          </Form.Item>
        </div>
      </Drawer>
    </ContainerLayout>
  )
}

export default MainPage
