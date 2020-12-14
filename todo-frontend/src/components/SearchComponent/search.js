import { React, Fragment }from 'react';
import './search.style.css';

const SearchComponent = () =>(
    <div className="search-content">
      
        <div class="md-form mt-0" id="input-search">
            <input id="txtsearch" class="form-control" type="text" placeholder="Search" aria-label="Search" maxLength="30"/>
            <li class="fas fa-search"></li>

        </div>
        <div>
        </div>

    </div>
)

export default SearchComponent;
