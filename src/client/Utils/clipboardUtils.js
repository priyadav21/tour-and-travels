/* eslint-disable indent,indent */
import { notify } from '../Components/core/common/notify';

class ClipboardUtils {
	static copyTextToClipboard = (text, successText) => {
		try {
			const textArea = document.createElement('textarea');
			textArea.style.position = 'fixed';
			textArea.style.top = 0;
			textArea.style.left = 0;
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			textArea.style.padding = 0;
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';
			textArea.style.background = 'transparent';
			textArea.value = text;
			document.body.appendChild(textArea);

			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
				const editable = textArea.contentEditable;
				const readOnly = textArea.readOnly;

				textArea.contentEditable = true;
				textArea.readOnly = false;

				const range = document.createRange();
				range.selectNodeContents(textArea);

				const selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);

				textArea.setSelectionRange(0, 999999);
				textArea.contentEditable = editable;
				textArea.readOnly = readOnly;
			} else {
				textArea.select();
			}

			document.execCommand('copy');
			document.body.removeChild(textArea);
			notify.show(successText || 'Copied!', 'success', 2000);
		} catch (err) {
			notify.show('Error in copying!', 'error', 2000);
		}
	};
}

export default ClipboardUtils;
