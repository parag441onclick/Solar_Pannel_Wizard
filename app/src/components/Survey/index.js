import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import questions from "../../api/questions";

import { pageNumberCheck } from "../../actions/SurveyActions";

import PropertySurvey from "./components/PropertySurvey";
import StateSurvey from "./components/StateSurvey";

import history from "../../history";

class Survey extends React.Component {
  state = {
    page: 1,
    questions: null,
  };

  componentDidMount() {
    this.confirmNavigation();
    questions.get("/data").then((resp) => {
      this.setState({ questions: resp.data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.confirmNavigation();
    }
  }

  confirmNavigation = () => {
    let checkedPageNo = Number(localStorage.getItem("checkedPageNo"));
    let parmasId = this.props.match.params.id;
    if (checkedPageNo) {
      if (parmasId !== checkedPageNo + 1) {
        if (parmasId >= 1 && parmasId < 10) {
          this.setState({ page: checkedPageNo + 1 });
          history.push(`/survey/question/${checkedPageNo + 1}`);
        } else if (parmasId < 1) {
          this.setState({ page: checkedPageNo + 1 });
          history.push(`/survey/question/${checkedPageNo + 1}`);
        } else if (parmasId >= 10) {
          this.setState({ page: checkedPageNo + 1 });
          history.push(`/survey/question/${checkedPageNo + 1}`);
        }
      } else {
        this.setState({ page: checkedPageNo + 1 });
      }
    } else {
      localStorage.setItem("checkedPageNo", 0);
      this.setState({ page: 1 });
      history.push(`/survey/question/${1}`);
    }
  };

  incermentRoute = (page) => {
    if (page < 10) {
      localStorage.setItem(
        "checkedPageNo",
        Number(localStorage.getItem("checkedPageNo")) + 1
      );
      this.setState({ page: page + 1 });
    }
  };

  decrementRoute = (page) => {
    if (page > 1) {
      localStorage.setItem(
        "checkedPageNo",
        Number(localStorage.getItem("checkedPageNo")) - 1
      );
      this.setState({ page: page - 1 });
    }
  };

  renderQuestions = (questions) => {
    let parmasId = this.props.match.params.id;

    if (questions === null) {
      return null;
    }

    console.log("questions", questions);
  };

  render() {
    const { page, questions } = this.state;
    return (
      <div>
        <h2>Save by comparing solar panel quotes</h2>
        <div className='d-flex justify-content-around'>
          <PropertySurvey />
          {this.renderQuestions(questions)}
          <Link
            onClick={(e) => this.incermentRoute(page)}
            to={page < 10 ? `/survey/question/${page + 1}` : "/"}>
            Next
          </Link>
        </div>
      </div>
    );
  }
}

const mapSTateToProps = (state) => {
  const { checkedPageNo } = state;
  return { checkedPageNo };
};

export default connect(mapSTateToProps, { pageNumberCheck })(Survey);
