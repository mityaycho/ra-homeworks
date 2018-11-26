'use strict';

const SearchBox = ({filterBooks}) => <input type="text" placeholder="Поиск по названию или автору" onChange={event => filterBooks(event.currentTarget.value)} />;