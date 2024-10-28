const Search = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      className="search-input" 
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default Search;