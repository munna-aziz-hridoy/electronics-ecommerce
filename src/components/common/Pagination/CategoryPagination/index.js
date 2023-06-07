export function paginate(data, page_number) {
  const page_size =8
  const total_items = data.length
  const total_pages = Math.ceil(total_items / page_size)

  if (page_number < 1 || page_number > total_pages) {
    return []
  }

  const start_index = (page_number - 1) * page_size
  const end_index = Math.min(start_index + page_size, total_items)

  const paginated_data = data.slice(start_index, end_index)
  return paginated_data
}
