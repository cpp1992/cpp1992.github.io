import { getMD } from '../utils/readMdUtils';

export const MD_MAKE = 'MD_MAKE';

export const mdFilesRead = (fileName = '') => (
	(dispatch) => {
		dispatch({
			type: MD_MAKE,
			mdfiles: getMD(fileName),
		});
	}
)


