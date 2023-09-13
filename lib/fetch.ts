interface FetchProps {
  endpoint: string;
  token?: string;
}

interface MutateProps<T> extends FetchProps {
  body: T;
}

const getRequest = async ({ endpoint, token }: FetchProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Response failed with status ${response.status}`, {
      cause: response,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

const postRequest = async <T>({ endpoint, body, token }: MutateProps<T>) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error(`Response failed with status ${response.status}`, {
      cause: response,
    });
  }

  const jsonResponse = await response.json();
  return jsonResponse;
};

export { getRequest, postRequest }
