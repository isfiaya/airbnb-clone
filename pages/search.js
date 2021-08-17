import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import format from "date-fns/format";
import InfoCard from "../components/InfoCard";

function Search({ searchResults }) {
  const router = useRouter();

  const { location, endDate, noOfGeust, startDate } = router.query;
  const formatedStartDate = format(new Date(startDate), "MM/dd/yyyy");
  const formatedEndDate = format(new Date(endDate), "MM/dd/yyyy");
  const range = `${formatedStartDate} - ${formatedEndDate}`;
  console.log(searchResults);
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGeust} Geusts`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {noOfGeust} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div>
            {searchResults.map(
              ({
                description,
                img,
                lat,
                location,
                long,
                price,
                star,
                title,
                total,
              }) => (
                <InfoCard
                  description={description}
                  img={img}
                  lat={lat}
                  location={location}
                  long={long}
                  price={price}
                  star={star}
                  title={title}
                  total={total}
                  key={img}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const res = await fetch(`https://links.papareact.com/isz`);
  const searchResults = await res.json();

  return {
    props: { searchResults },
  };
}
