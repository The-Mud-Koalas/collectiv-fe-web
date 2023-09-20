interface FetchProps {
  endpoint?: string;
  url?: string;
  token?: string;
}

interface MutateProps<T> extends FetchProps {
  body: T;
}

const getRequest = async ({ url, endpoint, token }: FetchProps) => {
  url ??= `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response failed with status ${response.status}`, {
      cause: response,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

const postRequest = async <T>({
  endpoint,
  body,
  url,
  token,
}: MutateProps<T>) => {
  url ??= `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Response failed with status ${response.status}`, {
      cause: response,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

export { getRequest, postRequest };
