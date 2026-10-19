import 'package:flutter_test/flutter_test.dart';
import 'package:kexart_app/data/artworks_data.dart';

void main() {
  test('ArtworksData contains curated artworks and categories for Arifur', () {
    expect(ArtworksData.artworks.isNotEmpty, true);
    expect(ArtworksData.categories.contains('All'), true);
    expect(ArtworksData.categories.contains('Portrait'), true);
    expect(ArtworksData.categories.contains('Tech & Art'), true);

    final first = ArtworksData.artworks.first;
    expect(first.title, 'Master Portrait — Arifur');
    expect(first.imageUrl, 'assets/images/gallery/art_01.webp');
    expect(first.audioUrl.isNotEmpty, true);
    expect(first.audioTitle.isNotEmpty, true);
  });
}
