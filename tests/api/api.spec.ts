import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  test('GET request should return a list of posts @api', async ({ request }) => {
    const response = await request.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    expect(response.status()).toBe(200);

    const posts = await response.json();

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
  });
});

test('POST request should create a post @api', async ({ request }) => {
  const response = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
      data: {
        title: 'Playwright API Test',
        body: 'Testing POST request with Playwright',
        userId: 1,
      },
    }
  );

  expect(response.status()).toBe(201);

  const post = await response.json();

  expect(post.title).toBe('Playwright API Test');
  expect(post.body).toBe('Testing POST request with Playwright');
  expect(post.userId).toBe(1);
  expect(post.id).toBeTruthy();
});


test('GET request should return a specific post @api', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const post = await response.json();

  expect(post.id).toBe(1);
  expect(post.userId).toBe(1);
  expect(post.title).toBeTruthy();
  expect(post.body).toBeTruthy();
});
