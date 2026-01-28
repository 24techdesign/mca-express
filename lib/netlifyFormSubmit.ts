export async function postNetlifyForm(form: HTMLFormElement): Promise<Response> {
  const fd = new FormData(form);

  // Ensure a form-name is present so Netlify can attribute the submission
  if (!fd.get('form-name')) {
    const nameAttr = form.getAttribute('name') || '';
    const hiddenInput = (form.querySelector('input[name="form-name"]') as HTMLInputElement | null)?.value;
    const formName = nameAttr || hiddenInput || 'form';
    fd.append('form-name', formName);
  }

  const params = new URLSearchParams();
  for (const [key, value] of fd.entries()) params.append(key, String(value));

  return fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
}

export default postNetlifyForm;
