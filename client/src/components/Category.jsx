

// eslint-disable-next-line react/prop-types
const Category = ({ img, category }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-3 h-20 w-20 rounded-2xl">
          <img src={img} alt={category} className="w-20 h-20 object-cover" />
          <p className="font-semibold text-lg text-nowrap">{category}</p>
        </div>
      </div>
    </>
  )
}

export default Category