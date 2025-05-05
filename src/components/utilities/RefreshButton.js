import React from "react";

export class RefreshButton extends React.Component {
  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    return (
      <button className="m-2 my-facebook-button" onClick={this.handleRefresh}>
        Refresh
      </button>
    );
  }
}
