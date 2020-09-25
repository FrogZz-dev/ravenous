import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        };

    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }

    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }

    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }

    handleSearch(event) {
        this.props.submitSearch(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    renderSortByOption() {
        return Object.keys(this.sortByOptions).map(key => {
            let sortValue = this.sortByOptions[key];

            return <li className={sortValue === this.state.sortBy ? 'active' : ''} key={sortValue} onClick={this.handleSortByChange.bind(this, sortValue)}>{key}</li>
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOption()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange} />
                    <input placeholder="Where?" onChange={this.handleLocationChange} />
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch} >Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;