import { getAllWords } from 'lib/services/dictionary'
import { searchDictionary } from 'lib/services/search';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.search || !req.query.criteria) {
    return res.status(422).json({ message: 'Missing search term or criteria' })
  }

  const { search, criteria } = req.query
  const formattedCriteria = criteria.split(',')

  const dictionary = getAllWords();
  const results = searchDictionary(search, dictionary, formattedCriteria)

  return res.status(200).json(results)
}
