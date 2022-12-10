import Link from "next/link";
import { LocationResponse } from "pages/api/search-locations";
import { useState, useMemo, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce/useDebounce";
import kebabCase from "lodash/kebabCase"

const Search = () => {
  const [data, setData] = useState<LocationResponse>({} as LocationResponse)
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearch = useDebounce(searchValue, 400)

  const getLocations = async () => {
    if (!searchValue) return {};

    const res = await fetch('/api/search-locations', 
    {
      method: "POST",
      body: JSON.stringify({
        searchValue: debouncedSearch
      })
    })
  
    return await res.json();
  };

  useEffect(()=>{
    getLocations().then((res:LocationResponse) => setData(res))
  }, [debouncedSearch])

  const resultsList = useMemo(() => {
    if(!data?.results){
      return null
    }

    return data?.results.map((el) => (
      <li key={el.id} className="search__listItem">
        <Link href={`/${kebabCase(el.name)}?id=${el.id}`} onClick={() => setSearchValue("")}>
          {el.name}
        </Link>
      </li>
    ));
  }, [data]);

  return (
    <div className="search" id="search-wrapper">
      <input
        className="search__input"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {data?.results?.length ? (
        <ul className="search__list">{resultsList}</ul>
      ) : null}
    </div>
  );
};

export default Search;
