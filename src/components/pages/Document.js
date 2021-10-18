import React, { Component } from "react"
import '../../App.css';
import ReactMarkdown from 'react-markdown';


class Document extends Component {
    constructor(props) {
        super(props)
        this.state = {markdownText: 'cat'}
    }

    componentDidMount() {
        console.log("caadasdasdfasf");
        fetch(this.props.markdown)
        .then(response => response.text())
        .then(
          text => {
              console.log(text);
            this.setState({markdownText: text});
          }
        );
    }
    

    render() {
        return (
            <div class="content">
            <ReactMarkdown
                children={this.state.markdownText}
            />
            </div>
        );
    }
}

export default Document;
