/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"
import { Layout, Menu, Avatar } from "antd"
const { Header, Content, Footer } = Layout

const PageLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Working Papers</Menu.Item>
            <Menu.Item key="3">Review Notes</Menu.Item>
          </Menu>
        </div>
        <div style={{ justifyContent: "flex-end" }}>
          <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
          <span style={{ color: "white", paddingLeft: 8 }}>Shane L.</span>
        </div>
      </Header>
      <Content>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {children}
        </div>
      </Content>
      <Footer>
        <footer>
          © {new Date().getFullYear()}, Built by{" "}
          <a href="https://www.betasmiths.com" target="#">Betasmiths</a> using
          {` `}
          <a href="https://www.gatsbyjs.org" target="#">Gatsby</a>
        </footer>
      </Footer>
    </Layout>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
