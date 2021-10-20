import React, { Component } from "react"
import PropTypes from 'prop-types'

import '../../App.css';
import ReactMarkdown from 'react-markdown';


class Document extends Component {
    constructor(props) {
        super(props)
        this.state = {markdownText: ''}
    }

    componentDidMount() {
        fetch(this.props.markdown)
        .then(response => response.text())
        .then(
          text => {
            this.setState({markdownText: text});
          }
        );
    }

    render() {
        return (
            <div className="content">
              <ReactMarkdown>{this.state.markdownText}</ReactMarkdown>
            </div>
        );
    }
}

Document.propTypes = {
    markdown: PropTypes.string
}

export default Document;
